(function () {
	'use strict';

	var GAME_WIDTH = 1300;
	var GAME_HEIGHT = 700;
	var STORAGE_KEY = 'piclouds.theme';
	var THEME_CLASSIC = 'classic';
	var THEME_RETRO = 'retro-arcade';

	var piSeed = '3141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067';
	var pi = buildPiSequence();
	var nuages = [];
	var nuages2 = [];
	var digitGroups = [];
	var timer = 0;
	var decimal = -1;
	var densityDivider = 4;
	var velocityDivider = 0.6;
	var themeId = resolveThemeId();
	var activeTheme = null;

	var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.CANVAS, 'game', {
		preload: preload,
		create: create,
		update: update
	}, false, false);

	var themes = {
		classic: {
			id: THEME_CLASSIC,
			label: 'Classic',
			pageBackground: '#43a9df',
			stageBackground: '#4488AA',
			buildBackdrop: buildClassicBackdrop,
			styleCloud: styleClassicCloud
		},
		'retro-arcade': {
			id: THEME_RETRO,
			label: 'Retro Arcade',
			pageBackground: '#0b0716',
			stageBackground: '#0b0716',
			buildBackdrop: buildRetroBackdrop,
			styleCloud: styleRetroCloud
		}
	};

	function buildPiSequence() {
		var digits = piSeed.split('');
		var i;

		for (i = 0; i < 10000; i++) {
			digits.push(String(randInt(0, 9)));
		}

		return digits;
	}

	function randInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function normalizeThemeId(value) {
		value = (value || '').toLowerCase();

		if (value === 'retro' || value === 'arcade' || value === 'retro_arcade') {
			return THEME_RETRO;
		}

		if (value === THEME_RETRO || value === THEME_CLASSIC) {
			return value;
		}

		return THEME_CLASSIC;
	}

	function resolveThemeId() {
		var searchParams;
		var fromQuery = '';
		var fromStorage = '';

		if (window.URLSearchParams) {
			searchParams = new URLSearchParams(window.location.search);
			fromQuery = searchParams.get('theme') || '';
		}

		try {
			fromStorage = window.localStorage.getItem(STORAGE_KEY) || '';
		} catch (err) {
			fromStorage = '';
		}

		return normalizeThemeId(fromQuery || fromStorage);
	}

	function persistThemeId(nextThemeId) {
		var url;

		try {
			window.localStorage.setItem(STORAGE_KEY, nextThemeId);
		} catch (err) {
			// Ignore storage failures and fall back to the query string only.
		}

		url = new URL(window.location.href);
		url.searchParams.set('theme', nextThemeId);
		window.history.replaceState(null, '', url.toString());
	}

	function preload() {
		game.load.image('nuage', 'nuage.png');
		game.load.image('nuage2', 'nuage2.png');
		game.load.image('field', 'field.png');
		game.load.image('fond', 'fond.png');
		game.load.image('fond2', 'fond2.png');
	}

	function create() {
		var select;
		var i;

		activeTheme = themes[themeId] || themes.classic;
		game.time.desiredFps = 30;
		document.body.style.backgroundColor = activeTheme.pageBackground;
		activeTheme.buildBackdrop();
		createDigitGroups();

		select = document.getElementById('theme-select');
		if (select) {
			select.value = themeId;
			select.onchange = function () {
				var nextThemeId = normalizeThemeId(select.value);

				if (nextThemeId !== themeId) {
					persistThemeId(nextThemeId);
					window.location.reload();
				}
			};
		}

		for (i = 0; i < digitGroups.length; i++) {
			if (digitGroups[i]) {
				game.world.bringToTop(digitGroups[i]);
			}
		}

		if (activeTheme.fond2) {
			game.world.bringToTop(activeTheme.fond2);
		}

		if (activeTheme.foregroundGroup) {
			game.world.bringToTop(activeTheme.foregroundGroup);
		}
	}

	function update() {
		var i;

		timer++;

		if (decimal + 1 < pi.length && timer > pi[decimal + 1] * densityDivider) {
			spawnCloudPair();
		}

		for (i = 0; i <= decimal; i++) {
			if (!nuages[i] || !nuages[i].exists) {
				continue;
			}

			if (nuages[i].x > 1800) {
				nuages[i].destroy();
				nuages2[i].destroy();
				continue;
			}

			nuages[i].x += pi[i] / Math.abs(velocityDivider);
			nuages2[i].x += pi[i] / Math.abs(velocityDivider);
		}

		for (i = 0; i < digitGroups.length; i++) {
			if (digitGroups[i]) {
				game.world.bringToTop(digitGroups[i]);
			}
		}

		if (activeTheme.foregroundGroup) {
			game.world.bringToTop(activeTheme.foregroundGroup);
		}
	}

	function spawnCloudPair() {
		var digit;
		var front;
		var back;
		var bucket;

		decimal++;
		timer = 0;
		digit = pi[decimal];
		bucket = digitGroups[digit];

		front = game.add.tileSprite(-200, 0, 768, 312, 'nuage');
		back = game.add.tileSprite(-200, 0, 768, 312, 'nuage2');
		nuages.push(front);
		nuages2.push(back);

		activeTheme.styleCloud(front, digit, true, decimal);
		activeTheme.styleCloud(back, digit, false, decimal);

		if (bucket) {
			bucket.add(front);
			bucket.add(back);
		}
	}

	function createDigitGroups() {
		var i;

		for (i = 0; i < 10; i++) {
			digitGroups[i] = game.add.group();
		}
	}

	function styleClassicCloud(sprite, digit, isFront) {
		sprite.anchor.setTo(0.7, 0.5);
		sprite.x = -200;
		sprite.y = isFront ? 400 - (digit * 34 - 15) : 400 + (digit * 34 - 15);
		sprite.scale.setTo(digit / 10, digit / 10);
		sprite.alpha = isFront ? 0.9 : 0.99;
	}

	function styleRetroCloud(sprite, digit, isFront, index) {
		var frontPalette = [
			0x7df9ff, 0xff4fd8, 0xffff7d, 0x9eff5e, 0xff914d,
			0xb388ff, 0x5fffd7, 0xff6b6b, 0x7df9ff, 0xffe36e
		];
		var backPalette = [
			0x24113f, 0x35144c, 0x43184f, 0x183f55, 0x3f1b56,
			0x28184b, 0x133f4c, 0x461744, 0x30164b, 0x1b274f
		];
		var scale = 0.58 + (digit * 0.06);

		sprite.anchor.setTo(0.68, 0.56);
		sprite.x = -240 - ((index % 5) * 18);
		sprite.y = isFront ? 305 - (digit * 18) : 455 + (digit * 12);
		sprite.scale.setTo(scale, scale);
		sprite.alpha = isFront ? 0.9 : 0.7;
		sprite.tint = isFront ? frontPalette[digit] : backPalette[digit];
		sprite.angle = isFront ? ((digit % 2) === 0 ? 1.5 : -1.5) : ((digit % 2) === 0 ? -0.9 : 0.9);
	}

	function buildClassicBackdrop() {
		game.stage.backgroundColor = themes.classic.stageBackground;
		game.add.tileSprite(0, 0, GAME_WIDTH, 400, 'fond');
		activeTheme.fond2 = game.add.tileSprite(0, 400, GAME_WIDTH, 300, 'fond2');
		activeTheme.fond2.alpha = 0.9;
	}

	function buildRetroBackdrop() {
		var sky = createRetroSkyBitmap();
		var sun = createRetroSunBitmap();
		var grid = createRetroGridBitmap();
		var scanlines = createScanlinesBitmap();

		game.stage.backgroundColor = themes['retro-arcade'].stageBackground;
		game.add.image(0, 0, sky);
		game.add.image(650, 190, sun).anchor.setTo(0.5, 0.5);

		activeTheme.foregroundGroup = game.add.group();
		activeTheme.grid = game.add.tileSprite(0, 390, GAME_WIDTH, 310, grid);
		activeTheme.scanlines = game.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, scanlines);
		activeTheme.scanlines.alpha = 0.2;
		activeTheme.frame = game.add.graphics(0, 0);
		activeTheme.frame.lineStyle(4, 0xff4fd8, 0.78);
		activeTheme.frame.drawRect(14, 14, GAME_WIDTH - 28, GAME_HEIGHT - 28);
		activeTheme.frame.lineStyle(1, 0x7df9ff, 0.55);
		activeTheme.frame.drawRect(28, 28, GAME_WIDTH - 56, GAME_HEIGHT - 56);

		activeTheme.foregroundGroup.add(activeTheme.grid);
		activeTheme.foregroundGroup.add(activeTheme.scanlines);
		activeTheme.foregroundGroup.add(activeTheme.frame);
	}

	function createRetroSkyBitmap() {
		var bmd = game.add.bitmapData(GAME_WIDTH, GAME_HEIGHT);
		var ctx = bmd.context;
		var gradient;
		var i;
		var x;
		var y;

		gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
		gradient.addColorStop(0, '#070710');
		gradient.addColorStop(0.52, '#1d1033');
		gradient.addColorStop(0.78, '#4a1d58');
		gradient.addColorStop(1, '#ff6ac3');
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

		ctx.fillStyle = 'rgba(125, 249, 255, 0.95)';
		for (i = 0; i < 220; i++) {
			x = Math.random() * GAME_WIDTH;
			y = Math.random() * 360;
			ctx.fillRect(x, y, Math.random() < 0.8 ? 2 : 1, Math.random() < 0.8 ? 2 : 1);
		}

		ctx.fillStyle = 'rgba(255, 79, 216, 0.45)';
		for (i = 0; i < 70; i++) {
			x = Math.random() * GAME_WIDTH;
			y = Math.random() * 330;
			ctx.fillRect(x, y, 1, 1);
		}

		bmd.dirty = true;
		return bmd;
	}

	function createRetroSunBitmap() {
		var bmd = game.add.bitmapData(420, 260);
		var ctx = bmd.context;
		var gradient;
		var i;

		gradient = ctx.createRadialGradient(210, 150, 20, 210, 150, 135);
		gradient.addColorStop(0, 'rgba(255, 255, 204, 0.98)');
		gradient.addColorStop(0.35, 'rgba(255, 126, 214, 0.92)');
		gradient.addColorStop(1, 'rgba(255, 126, 214, 0)');
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, 420, 260);

		ctx.fillStyle = 'rgba(255, 85, 201, 0.72)';
		for (i = 0; i < 8; i++) {
			ctx.fillRect(95, 90 + (i * 18), 230, 8);
		}

		ctx.fillStyle = 'rgba(255, 244, 176, 0.9)';
		ctx.fillRect(150, 118, 120, 2);

		bmd.dirty = true;
		return bmd;
	}

	function createRetroGridBitmap() {
		var bmd = game.add.bitmapData(64, 64);
		var ctx = bmd.context;
		var i;

		ctx.clearRect(0, 0, 64, 64);
		ctx.strokeStyle = 'rgba(125, 249, 255, 0.32)';
		ctx.lineWidth = 2;

		for (i = 0; i <= 64; i += 16) {
			ctx.beginPath();
			ctx.moveTo(i, 0);
			ctx.lineTo(i, 64);
			ctx.stroke();
		}

		ctx.strokeStyle = 'rgba(255, 79, 216, 0.2)';
		for (i = 0; i <= 64; i += 16) {
			ctx.beginPath();
			ctx.moveTo(0, i);
			ctx.lineTo(64, i);
			ctx.stroke();
		}

		ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
		ctx.beginPath();
		ctx.moveTo(0, 63);
		ctx.lineTo(64, 63);
		ctx.stroke();

		bmd.dirty = true;
		return bmd;
	}

	function createScanlinesBitmap() {
		var bmd = game.add.bitmapData(4, 4);
		var ctx = bmd.context;

		ctx.fillStyle = 'rgba(0, 0, 0, 0)';
		ctx.fillRect(0, 0, 4, 4);
		ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
		ctx.fillRect(0, 0, 4, 1);
		ctx.fillRect(0, 2, 4, 1);

		bmd.dirty = true;
		return bmd;
	}
}());
