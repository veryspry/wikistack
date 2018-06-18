const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging : false
});


const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

function generateSlug(title) {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

Page.beforeValidate(page => {
  // Generate slug
  if (!page.slug) {
    page.slug = page.title.replace(/\s/g, "_").replace(/\W/g, "").toLowerCase();
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull : false
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull : false
  }
});

Page.belongsTo(User, {as: 'author'});

module.exports = { Page, User, db };
// module.exports = { db };
