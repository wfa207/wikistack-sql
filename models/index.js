var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistackdb', {
	logging: console.log(), // must be a function OR false
});

// var routeMethods = {
// 	route: function() {
// 		return '/wiki'+ this.urlTitle;
// 	},
// };

function generateUrlTitle (title) {
	if (title) {
		// Removes all non-alphanumeric characters from title
		// And make whitespace underscore
		return '/wiki/' + title.replace(/\s+/g, '_').replace(/\W/g, '');
	} else {
		// Generates random 5 letter string
		return '/wiki/' + Math.random().toString(36).substring(2, 7);
	}
}

var Page = db.define('Page', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	urlTitle: {
		type: Sequelize.STRING,
		allowNull: false,
		
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
	status: {
		type: Sequelize.BOOLEAN,
		defautValue: true,
	},
});

Page.hook('beforeValidate', function(page, options) {
	page.urlTitle = generateUrlTitle(page.title);
});

// Page.hook('afterValidate', function(page, options) {
// 	console.log('After Validate: ', page.urlTitle);
// 	return db.Promise.resolve('Invalid page title entered');
// });

var User = db.define('User', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		isEmail: true,
		allowNull: false,
	},
});

Page.belongsTo(User, { as: 'author' });


// Construction Zone ----------------------------
// console.log(Page.sync());
// is sync a dangerous method? does it change Page.

// (function () {
// 	var args = [].slice.call(arguments);
// 	return args.map(function(arg) {
// 		return arg.sync();
// 	});
// })(Page, User);

// console.log(Page, User);
// -----------------------------------------
module.exports = {
	Page: Page,
	User: User,
};