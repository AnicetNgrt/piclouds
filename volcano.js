var game = new Phaser.Game(1300, 700, Phaser.CANVAS, 'game', {
	preload: preload,
	create: create,
	update: update
}, false, false);

var pi = [3,1,4,1,5,9,2,6,5,3,5,8,9,7,9,3,2,3,8,4,6,2,6,4,3,3,8,3,2,7,9,5,0,2,8,8,4,1,9,7,1,6,9,3,9,9,3,7,5,1,0,5,8,2,0,9,7,4,9,4,4,5,9,2,3,0,7,8,1,6,4,0,6,2,8,6,2,0,8,9,9,8,6,2,8,0,3,4,8,2,5,3,4,2,1,1,7,0,6,7,9,8,2,1,4,8,0,8,6,5,1,3,2,8,2,3,0,6,6,4,7,0,9,3,8,4,4,6,0,9,5,5,0,5,8,2,2,3,1,7,2,5,3,5,9,4,0,8,1,2,8,4,8,1,1,1,7,4,5,0,2,8,4,1,0,2,7,0,1,9,3,8,5,2,1,1,0,5,5,5,9,6,4,4,6,2,2,9,4,8,9,5,4,9,3,0,3,8,1,9,6,4,4,2,8,8,1,0,9,7,5,6,6,5,9,3,3,4,4,6,1,2,8,4,7,5,6,4,8,2,3,3,7,8,6,7,8,3,1,6,5,2,7,1,2,0,1,9,0,9,1,4,5,6,4,8,5,6,6,9,2,3,4,6,0,3,4,8,6,1,0,4,5,4,3,2,6,6,4,8,2,1,3,3,9,3,6,0,7,2,6,0,2,4,9,1,4,1,2,7,3,7,2,4,5,8,7,0,0,6,6,0,6,3,1,5,5,8,8,1,7,4,8,8,1,5,2,0,9,2,0,9,6,2,8,2,9,2,5,4,0,9,1,7,1,5,3,6,4,3,6,7,8,9,2,5,9,0,3,6,0,0,1,1,3,3,0,5,3,0,5,4,8,8,2,0,4,6,6,5,2,1,3,8,4,1,4,6,9,5,1,9,4,1,5,1,1,6,0,9,4,3,3,0,5,7,2,7,0,3,6,5,7,5,9,5,9,1,9,5,3,0,9,2,1,8,6,1,1,7,3,8,1,9,3,2,6,1,1,7,9,3,1,0,5,1,1,8,5,4,8,0,7,4,4,6,2,3,7,9,9,6,2,7,4,9,5,6,7,3,5,1,8,8,5,7,5,2,7,2,4,8,9,1,2,2,7,9,3,8,1,8,3,0,1,1,9,4,9,1,2,9,8,3,3,6,7,3,3,6,2,4,4,0,6,5,6,6,4,3,0,8,6,0,2,1,3,9,4,9,4,6,3,9,5,2,2,4,7,3,7,1,9,0,7,0,2,1,7,9,8,6,0,9,4,3,7,0,2,7,7,0,5,3,9,2,1,7,1,7,6,2,9,3,1,7,6,7,5,2,3,8,4,6,7,4,8,1,8,4,6,7,6,6,9,4,0,5,1,3,2,0,0,0,5,6,8,1,2,7,1,4,5,2,6,3,5,6,0,8,2,7,7,8,5,7,7,1,3,4,2,7,5,7,7,8,9,6,0,9,1,7,3,6,3,7,1,7,8,7,2,1,4,6,8,4,4,0,9,0,1,2,2,4,9,5,3,4,3,0,1,4,6,5,4,9,5,8,5,3,7,1,0,5,0,7,9,2,2,7,9,6,8,9,2,5,8,9,2,3,5,4,2,0,1,9,9,5,6,1,1,2,1,2,9,0,2,1,9,6,0,8,6,4,0,3,4,4,1,8,1,5,9,8,1,3,6,2,9,7,7,4,7,7,1,3,0,9,9,6,0,5,1,8,7,0,7,2,1,1,3,4,9,9,9,9,9,9,8,3,7,2,9,7,8,0,4,9,9,5,1,0,5,9,7,3,1,7,3,2,8,1,6,0,9,6,3,1,8,5,9,5,0,2,4,4,5,9,4,5,5,3,4,6,9,0,8,3,0,2,6,4,2,5,2,2,3,0,8,2,5,3,3,4,4,6,8,5,0,3,5,2,6,1,9,3,1,1,8,8,1,7,1,0,1,0,0,0,3,1,3,7,8,3,8,7,5,2,8,8,6,5,8,7,5,3,3,2,0,8,3,8,1,4,2,0];

var densityDivider = 4;
var decimal = -1;
var timer = 0;
var eruptionPulse = 0;
var particles = [];
var textures = {};
var scene = {};
var craterX = 640;
var craterY = 208;
var groundY = 700;
var fxLayer;

function preload() {}

function create() {
	game.time.desiredFps = 30;
	game.stage.backgroundColor = '#090202';

	textures.background = makeBitmap(1300, 700, drawBackground);
	textures.volcano = makeBitmap(1300, 700, drawVolcano);
	textures.glow = makeBitmap(260, 260, drawGlow);
	textures.smoke = makeBitmap(128, 128, drawSmoke);
	textures.ember = makeBitmap(48, 48, drawEmber);
	textures.lava = makeBitmap(64, 64, drawLava);
	textures.ash = makeBitmap(24, 24, drawAsh);

	scene.background = game.add.image(0, 0, textures.background);
	scene.volcano = game.add.image(0, 0, textures.volcano);
	scene.glow = game.add.image(craterX - 2, craterY - 6, textures.glow);
	scene.glow.anchor.set(0.5);
	scene.glow.blendMode = Phaser.blendModes.SCREEN;

	fxLayer = game.add.group();
	seedInitialEruptions();
}

function update() {
	timer++;

	var nextIndex = (decimal + 1) % pi.length;
	if (timer > pi[nextIndex] * densityDivider) {
		decimal = nextIndex;
		timer = 0;
		spawnBeat(pi[decimal], decimal);
	}

	updateParticles();

	eruptionPulse *= 0.95;
	scene.glow.alpha = 0.32 + eruptionPulse * 0.9 + 0.08 * Math.sin(game.time.now / 180);
	scene.glow.scale.setTo(0.88 + eruptionPulse * 0.15, 0.88 + eruptionPulse * 0.12);
	scene.glow.rotation = Math.sin(game.time.now / 1200) * 0.05;
}

function spawnBeat(digit, index) {
	eruptionPulse = Math.min(0.75, 0.12 + digit * 0.07);

	var smokeCount = 3 + Math.floor(digit / 2);
	var emberCount = 2 + Math.floor(digit / 4);
	var lavaCount = digit > 4 ? 1 : 0;
	var ashCount = 1 + Math.floor(digit / 4);
	var spread = 14 + digit * 5;
	var lift = 24 + digit * 4;

	for (var i = 0; i < smokeCount; i++) {
		makeParticle('smoke', {
			x: craterX + randInt(-spread, spread),
			y: craterY - randInt(6, 16),
			vx: randFloat(-0.2, 0.45) + digit * 0.04,
			vy: randFloat(-1.1, -0.45) - digit * 0.07,
			alpha: 0.18 + digit * 0.035,
			scale: 0.24 + digit * 0.04 + randFloat(0, 0.16),
			growth: 0.0022 + digit * 0.0005,
			drag: 0.994,
			gravity: -0.002,
			spin: randFloat(-0.01, 0.01),
			life: 220 + digit * 12,
			tint: [0x4c403a, 0x57453f, 0x6b5448, 0x7f6553, 0x906f58, 0x9d7760, 0xa07864, 0x8e6454, 0x705146, 0x544038][digit]
		});
	}

	for (var j = 0; j < emberCount; j++) {
		makeParticle('ember', {
			x: craterX + randInt(-10, 10),
			y: craterY - randInt(2, 8),
			vx: randFloat(-1.1, 1.1) + digit * 0.22,
			vy: randFloat(-lift * 0.12, -lift * 0.04),
			alpha: 0.78,
			scale: 0.08 + digit * 0.012 + randFloat(0, 0.03),
			growth: 0.0004,
			drag: 0.992,
			gravity: 0.014 + digit * 0.0012,
			spin: randFloat(-0.05, 0.05),
			life: 110 + digit * 8,
			tint: [0xffb45c, 0xff9c46, 0xff8a34, 0xff7428, 0xff6d1d, 0xff5e17, 0xff5510, 0xff7f31, 0xffa13b, 0xffc65f][digit]
		});
	}

	for (var k = 0; k < lavaCount; k++) {
		makeParticle('lava', {
			x: craterX + randInt(-8, 8),
			y: craterY - randInt(2, 6),
			vx: randFloat(-0.8, 0.8) + digit * 0.14,
			vy: randFloat(-4.4, -2.4) - digit * 0.2,
			alpha: 0.9,
			scale: 0.16 + digit * 0.018,
			growth: 0.0001,
			drag: 0.992,
			gravity: 0.08 + digit * 0.003,
			spin: randFloat(-0.04, 0.04),
			life: 180 + digit * 6,
			tint: [0xff4e16, 0xff5619, 0xff6320, 0xff7224, 0xff7f2a, 0xff8d30, 0xff9a34, 0xffae37, 0xffc53e, 0xffdd57][digit]
		});
	}

	for (var m = 0; m < ashCount; m++) {
		makeParticle('ash', {
			x: craterX + randInt(-spread * 2, spread * 2),
			y: craterY - 40 - randInt(0, 30),
			vx: randFloat(0.6, 1.8) + digit * 0.08,
			vy: randFloat(-0.3, -0.05) - digit * 0.025,
			alpha: 0.26,
			scale: 0.08 + randFloat(0, 0.05),
			growth: 0,
			drag: 0.997,
			gravity: 0.003,
			spin: randFloat(-0.06, 0.06),
			life: 180 + digit * 10,
			tint: [0x83756b, 0x7b6b60, 0x6e6156, 0x62574d, 0x5d5148, 0x564a42, 0x4f433c, 0x3d3530, 0x2c2623, 0x1f1b19][digit]
		});
	}
}

function makeParticle(type, options) {
	var sprite = game.add.sprite(options.x, options.y, textures[type]);
	sprite.anchor.set(0.5);
	sprite.alpha = options.alpha;
	sprite.scale.setTo(options.scale, options.scale);
	sprite.tint = options.tint;
	sprite.vx = options.vx;
	sprite.vy = options.vy;
	sprite.drag = options.drag;
	sprite.gravity = options.gravity;
	sprite.spin = options.spin;
	sprite.growth = options.growth;
	sprite.life = options.life;
	sprite.type = type;

	fxLayer.add(sprite);
	particles.push(sprite);
	return sprite;
}

function seedInitialEruptions() {
	spawnBeat(pi[0], 0);
	spawnBeat(pi[1], 1);
	spawnBeat(pi[2], 2);
}

function updateParticles() {
	for (var i = particles.length - 1; i >= 0; i--) {
		var p = particles[i];
		p.vx *= p.drag;
		p.vy = p.vy * p.drag + p.gravity;
		p.x += p.vx;
		p.y += p.vy;
		p.angle += p.spin;
		p.scale.x += p.growth;
		p.scale.y += p.growth;
		p.life--;

		if (p.type === 'smoke') {
			p.alpha *= 0.992;
			p.y -= 0.1;
		} else if (p.type === 'ember') {
			p.alpha *= 0.987;
		} else if (p.type === 'lava') {
			p.alpha *= 0.995;
			if (p.y > groundY - 40) {
				p.y = groundY - 40;
				p.vy *= -0.25;
				p.vx *= 0.85;
				p.spin *= 0.8;
			}
		} else {
			p.alpha *= 0.996;
		}

		if (p.life <= 0 || p.alpha < 0.03 || p.x < -120 || p.x > 1420 || p.y < -140 || p.y > 840) {
			p.destroy();
			particles.splice(i, 1);
		}
	}
}

function makeBitmap(width, height, painter) {
	var bmd = game.add.bitmapData(width, height);
	painter(bmd.context, width, height);
	bmd.dirty = true;
	return bmd;
}

function drawBackground(ctx, width, height) {
	var sky = ctx.createLinearGradient(0, 0, 0, height);
	sky.addColorStop(0, '#090202');
	sky.addColorStop(0.28, '#1c0606');
	sky.addColorStop(0.5, '#35100d');
	sky.addColorStop(0.68, '#6f1a10');
	sky.addColorStop(0.78, '#20100d');
	sky.addColorStop(1, '#090202');
	ctx.fillStyle = sky;
	ctx.fillRect(0, 0, width, height);

	var craterGlow = ctx.createRadialGradient(craterX, craterY, 10, craterX, craterY, 360);
	craterGlow.addColorStop(0, 'rgba(255, 188, 84, 0.38)');
	craterGlow.addColorStop(0.2, 'rgba(255, 97, 18, 0.20)');
	craterGlow.addColorStop(0.5, 'rgba(116, 24, 12, 0.14)');
	craterGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
	ctx.fillStyle = craterGlow;
	ctx.fillRect(0, 0, width, height);

	ctx.fillStyle = '#0e0505';
	ctx.fillRect(0, 558, width, 142);

	ctx.fillStyle = '#1d0908';
	ctx.beginPath();
	ctx.moveTo(0, 510);
	ctx.lineTo(120, 470);
	ctx.lineTo(220, 490);
	ctx.lineTo(355, 455);
	ctx.lineTo(500, 480);
	ctx.lineTo(660, 454);
	ctx.lineTo(820, 488);
	ctx.lineTo(980, 460);
	ctx.lineTo(1120, 490);
	ctx.lineTo(width, 470);
	ctx.lineTo(width, height);
	ctx.lineTo(0, height);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = 'rgba(255, 88, 11, 0.10)';
	ctx.beginPath();
	ctx.ellipse(820, 520, 240, 56, 0.1, 0, Math.PI * 2);
	ctx.fill();

	ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
	for (var i = 0; i < 900; i++) {
		var x = randInt(0, width - 1);
		var y = randInt(0, height - 1);
		var alpha = Math.random() * 0.12;
		var size = Math.random() < 0.93 ? 1 : 2;
		var r = randInt(72, 122);
		var g = randInt(30, 68);
		var b = randInt(18, 48);
		ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
		ctx.fillRect(x, y, size, size);
	}

	drawSmokeCloud(ctx, 510, 150, 150, 90, 0.18);
	drawSmokeCloud(ctx, 760, 120, 180, 100, 0.12);
	drawSmokeCloud(ctx, 930, 175, 130, 78, 0.08);
}

function drawVolcano(ctx, width, height) {
	ctx.clearRect(0, 0, width, height);

	ctx.fillStyle = '#0c0404';
	ctx.beginPath();
	ctx.moveTo(125, height);
	ctx.lineTo(275, 430);
	ctx.lineTo(395, 320);
	ctx.lineTo(520, 255);
	ctx.lineTo(610, 212);
	ctx.lineTo(668, 195);
	ctx.lineTo(740, 219);
	ctx.lineTo(850, 298);
	ctx.lineTo(980, 410);
	ctx.lineTo(1165, height);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = '#160807';
	ctx.beginPath();
	ctx.moveTo(220, height);
	ctx.lineTo(350, 395);
	ctx.lineTo(490, 285);
	ctx.lineTo(604, 222);
	ctx.lineTo(690, 215);
	ctx.lineTo(790, 260);
	ctx.lineTo(920, 370);
	ctx.lineTo(1040, height);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = 'rgba(74, 27, 18, 0.28)';
	ctx.beginPath();
	ctx.moveTo(290, 520);
	ctx.lineTo(395, 388);
	ctx.lineTo(505, 300);
	ctx.lineTo(520, 332);
	ctx.lineTo(432, 430);
	ctx.lineTo(350, 560);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = 'rgba(116, 43, 27, 0.22)';
	ctx.beginPath();
	ctx.moveTo(780, 324);
	ctx.lineTo(910, 410);
	ctx.lineTo(998, 560);
	ctx.lineTo(916, 540);
	ctx.lineTo(825, 440);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = '#2a1010';
	ctx.beginPath();
	ctx.ellipse(craterX, craterY, 86, 30, 0.04, 0, Math.PI * 2);
	ctx.fill();

	ctx.fillStyle = '#781a10';
	ctx.beginPath();
	ctx.ellipse(craterX, craterY + 1, 63, 20, 0.04, 0, Math.PI * 2);
	ctx.fill();

	ctx.fillStyle = '#ff6a17';
	ctx.beginPath();
	ctx.ellipse(craterX, craterY + 2, 32, 10, 0.04, 0, Math.PI * 2);
	ctx.fill();

	ctx.fillStyle = '#ffd76d';
	ctx.beginPath();
	ctx.ellipse(craterX + 2, craterY + 1, 18, 5, 0.04, 0, Math.PI * 2);
	ctx.fill();

	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';

	ctx.beginPath();
	ctx.moveTo(craterX, craterY + 9);
	ctx.bezierCurveTo(695, 280, 730, 340, 790, 450);
	ctx.bezierCurveTo(835, 530, 848, 600, 900, 700);
	ctx.strokeStyle = 'rgba(255, 95, 18, 0.30)';
	ctx.lineWidth = 52;
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(craterX, craterY + 9);
	ctx.bezierCurveTo(693, 279, 728, 338, 790, 448);
	ctx.bezierCurveTo(835, 530, 848, 600, 900, 700);
	ctx.strokeStyle = 'rgba(255, 214, 98, 0.82)';
	ctx.lineWidth = 14;
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(craterX - 12, craterY + 18);
	ctx.bezierCurveTo(585, 278, 530, 374, 475, 504);
	ctx.bezierCurveTo(445, 572, 405, 632, 348, 700);
	ctx.strokeStyle = 'rgba(255, 82, 22, 0.22)';
	ctx.lineWidth = 36;
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(craterX - 12, craterY + 18);
	ctx.bezierCurveTo(585, 278, 530, 374, 475, 504);
	ctx.bezierCurveTo(445, 572, 405, 632, 348, 700);
	ctx.strokeStyle = 'rgba(255, 191, 75, 0.65)';
	ctx.lineWidth = 10;
	ctx.stroke();

	ctx.strokeStyle = 'rgba(255, 138, 35, 0.55)';
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(512, 342);
	ctx.lineTo(470, 410);
	ctx.lineTo(440, 486);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(770, 350);
	ctx.lineTo(804, 430);
	ctx.lineTo(836, 545);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(618, 248);
	ctx.lineTo(604, 312);
	ctx.lineTo(578, 377);
	ctx.stroke();

	ctx.fillStyle = 'rgba(255, 65, 10, 0.06)';
	ctx.beginPath();
	ctx.ellipse(610, 430, 110, 44, 0.15, 0, Math.PI * 2);
	ctx.fill();
}

function drawGlow(ctx, width, height) {
	var glow = ctx.createRadialGradient(width * 0.5, height * 0.5, 8, width * 0.5, height * 0.5, width * 0.5);
	glow.addColorStop(0, 'rgba(255, 238, 151, 0.95)');
	glow.addColorStop(0.22, 'rgba(255, 154, 51, 0.88)');
	glow.addColorStop(0.45, 'rgba(255, 84, 14, 0.42)');
	glow.addColorStop(0.7, 'rgba(140, 25, 11, 0.08)');
	glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
	ctx.fillStyle = glow;
	ctx.fillRect(0, 0, width, height);
}

function drawSmoke(ctx, width, height) {
	var smoke = ctx.createRadialGradient(width * 0.5, height * 0.5, 10, width * 0.5, height * 0.5, width * 0.5);
	smoke.addColorStop(0, 'rgba(245, 235, 225, 0.88)');
	smoke.addColorStop(0.35, 'rgba(105, 95, 90, 0.54)');
	smoke.addColorStop(0.72, 'rgba(50, 45, 44, 0.18)');
	smoke.addColorStop(1, 'rgba(0, 0, 0, 0)');
	ctx.fillStyle = smoke;
	ctx.fillRect(0, 0, width, height);
}

function drawEmber(ctx, width, height) {
	var ember = ctx.createRadialGradient(width * 0.5, height * 0.5, 1, width * 0.5, height * 0.5, width * 0.5);
	ember.addColorStop(0, 'rgba(255, 255, 200, 1)');
	ember.addColorStop(0.22, 'rgba(255, 209, 95, 0.98)');
	ember.addColorStop(0.55, 'rgba(255, 102, 16, 0.78)');
	ember.addColorStop(1, 'rgba(0, 0, 0, 0)');
	ctx.fillStyle = ember;
	ctx.fillRect(0, 0, width, height);
}

function drawLava(ctx, width, height) {
	var lava = ctx.createRadialGradient(width * 0.5, height * 0.5, 3, width * 0.5, height * 0.5, width * 0.5);
	lava.addColorStop(0, 'rgba(255, 245, 175, 1)');
	lava.addColorStop(0.2, 'rgba(255, 188, 78, 0.98)');
	lava.addColorStop(0.5, 'rgba(255, 93, 14, 0.95)');
	lava.addColorStop(1, 'rgba(60, 8, 6, 0)');
	ctx.fillStyle = lava;
	ctx.fillRect(0, 0, width, height);
}

function drawAsh(ctx, width, height) {
	var ash = ctx.createRadialGradient(width * 0.5, height * 0.5, 1, width * 0.5, height * 0.5, width * 0.5);
	ash.addColorStop(0, 'rgba(228, 214, 201, 0.92)');
	ash.addColorStop(0.4, 'rgba(138, 122, 112, 0.58)');
	ash.addColorStop(1, 'rgba(0, 0, 0, 0)');
	ctx.fillStyle = ash;
	ctx.fillRect(0, 0, width, height);
}

function drawSmokeCloud(ctx, x, y, width, height, alpha) {
	var cloud = ctx.createRadialGradient(x, y, 2, x, y, width * 0.5);
	cloud.addColorStop(0, 'rgba(90, 76, 68, ' + alpha + ')');
	cloud.addColorStop(0.55, 'rgba(44, 38, 35, ' + (alpha * 0.55) + ')');
	cloud.addColorStop(1, 'rgba(0, 0, 0, 0)');
	ctx.fillStyle = cloud;
	ctx.beginPath();
	ctx.ellipse(x, y, width * 0.5, height * 0.48, 0, 0, Math.PI * 2);
	ctx.fill();
}

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
	return Math.random() * (max - min) + min;
}
