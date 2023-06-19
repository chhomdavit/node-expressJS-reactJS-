/* common */
#root {
  overflow: hidden;
}

.container {
  max-width: 1170px;
  padding: 0 15px;
  margin: 0 auto;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Merriweather', serif;
}

img {
  max-width: 100%;
  height: auto;
}

.ant-layout {
  background: #fff;
}

.ant-btn-primary {
  background: #27c4ff;
  border-color: #27c4ff;
}

.block {
  padding: 40px 0;
}

.separator {
  position: relative;
}

.separator:after {
  content: '';
  border-bottom: 1px solid #ddd;
  position: absolute;
  bottom: 0;
  left: -999px;
  right: -999px;
}

.bannerImage {
  margin: 20px 0;
}

/* topbar */
.topBar {
  position: relative;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topBar:before {
  content: '';
  background: #0c0c0c;
  position: absolute;
  top: 0;
  bottom: 0;
  left: -999px;
  right: -999px;
}

.topBar>* {
  position: relative;
}

.contactInfo {
  padding: 10px 0;
}

.topBar .contactInfo ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.topBar .contactInfo li {
  margin: 0 30px 0 0;
}

.topBar .contactInfo li span {
  margin: 0 5px 0 0;
}

.topBar .contactInfo a {
  color: #fff;
}

.topBar .otherInfo {
  display: flex;
}

.topBar .socialMedia {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 10px 0;
  font-size: 20px;
}

.topBar .socialMedia li {
  margin: 0 20px 0 0;
}

.topBar .socialMedia a {
  color: #fff;
  transition: color 0.3s linear;
}

.topBar .socialMedia a:hover {
  color: #f14705
}

.topBar .otherInfo button {
  background: #f14705;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s linear;
}

.topBar .otherInfo button:hover {
  opacity: 0.8;
}

/* header */
.ant-layout-header {
  background: none;
  padding: 0;
  height: auto;
  line-height: 1.6;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0;
}

.header .logo {
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 600;
}

.header .logo a {
  color: #27c4ff;
}

.header nav ul {
  display: flex;
  list-style: none;
  align-items: center;
  padding: 0;
  margin: 0;
  font-size: 16px;
}

.header nav li {
  margin: 0 0 0 20px;
}

.header nav a {
  color: #121212;
}

.header nav a:hover,
.header nav a.active,
.ant-drawer nav a.active {
  color: #27c4ff;
}

.ant-drawer nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ant-drawer nav li {
  margin: 15px 0;
}

.ant-drawer nav a {
  color: #333;
}

.header .shoppingInfo {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  font-size: 18px;
  border-left: 1px solid #ddd;
}

.header .shoppingInfo li {
  margin: 0 0 0 20px;
}

.header .shoppingInfo li a {
  color: #333;
}

.header .shoppingInfo li a:hover {
  color: #27c4ff;
}

/* hero block */
.heroBlock {
  padding: 40px 0;
  position: relative;
}

.heroBlock:after {
  content: '';
  border-bottom: 1px solid #ddd;
  position: absolute;
  bottom: 0;
  left: -999px;
  right: -999px;
}

.heroBlocks .holder {
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 9px 15px;
  margin: 0 0 25px;
  display: flex;
  align-items: center;
  min-height: 118px;
}

.heroBlocks .holder:last-child {
  margin: 0;
}

.heroBlocks .icon {
  color: #27c4ff;
  font-size: 30px;
  margin: 0 20px 0 0;
}

.heroBlocks h3 {
  line-height: 1.4;
}

.heroBlocks p {
  margin: 0;
}

.ant-carousel .slick-slide img {
  width: 100%;
}

/* products */
.products .image {
  text-align: center;
}

.products .price {
  margin: 0 0 20px;
  font-size: 20px;
}

.products h3 {
  height: 80px;
  overflow: hidden;
}

.products .salePrice {
  color: #f14705;
  text-decoration: line-through;
  margin: 0 5px 0 0;
}

/* information block */
.informationBlock .holder {
  background: #f9f9f9;
  border: 1px solid #ddd;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 30px 30px 300px;
}

.informationBlock h3 {
  font-size: 22px;
}

.informationBlock .price {
  font-size: 50px;
  font-weight: 700;
  line-height: 1;
  color: #f14705;
}

.informationBlock .holder p {
  color: #f14705;
  font-size: 16px;
}

/* product categories */
.productCategories h2 {
  margin: 0 0 40px;
}

.productCategories .image {
  border-radius: 50%;
  border: 3px solid #27c4ff;
  width: 127px;
  height: 127px;
  overflow: hidden;
  margin: 0 auto 10px;
}

.productCategories h3 {
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}

/* footer widget */
.ant-layout-footer {
  background: #212121;
  color: #e9e9e9;
}

.footerWidget {
  padding: 30px 0;
}

.footerWidget h3,
.footerWidget .ant-list-item-meta-title a {
  color: #d7d7d7;
}

.footerWidget h3 {
  font-size: 18px;
  margin: 0 0 25px;
}

.footerWidget .ant-list-item-meta-description {
  color: #f14705;
}

.footerWidget .ant-list-split .ant-list-item {
  border: 0;
  padding: 10px 0;
  color: #e9e9e9;
  position: relative;
}

.footerWidget .recentPost .ant-list-item {
  padding-left: 20px;
}

.footerWidget .recentPost .ant-list-item:before {
  content: '\f054';
  font: var(--fa-font-solid);
  position: absolute;
  top: 15px;
  left: 0;
}

.footerWidget .ant-list-item-meta-title {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue';
  font-weight: 300;
}

.footerWidget .ant-avatar {
  border-radius: 0 !important;
  width: 70px;
  height: 70px;
}

.footerWidget .tags .ant-tag {
  font-size: 15px;
  margin: 0 10px 10px 0;
  padding: 5px 15px;
}

.footerWidget .tags .ant-tag a {
  transition: opacity 0.3s linear;
}

.footerWidget .tags .ant-tag a:hover {
  opacity: 0.5;
}

.footerWidget .tags .ant-tag-close-icon {
  font-size: 15px;
}

/* footer copyright */
.footerCopyright {
  position: relative;
  padding: 25px 0 0;
}

.footerCopyright:before {
  content: '';
  background: #000;
  position: absolute;
  top: 0;
  bottom: -25px;
  left: -999px;
  right: -999px;
}

.footerCopyright .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

/* tabs */
.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn,
.ant-tabs-tab:hover {
  color: #27c4ff;
}

.ant-tabs-ink-bar {
  background: #27c4ff;
}

/* shop */
.shopPage .titleHolder {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobileVisible {
  display: none;
}

.mobileHidden {
  display: block;
}

/* responsive */
@media only screen and (max-width: 991px) {
  .topBar .contactInfo a span:last-child {
    display: none;
  }

  .topBar .contactInfo li {
    margin: 0 10px 0 0;
  }

  .heroBlock {
    padding: 20px 0;
  }

  .heroBlocks .holder {
    margin-bottom: 15px;
  }

  .informationBlock .holder {
    padding: 30px;
    height: 140px;
    background-image: none !important;
  }

  .ant-layout-footer {
    padding: 25px 0;
  }
}

@media only screen and (max-width: 767px) {
  .mobileVisible {
    display: block;
  }
  
  .mobileHidden {
    display: none;
  }
}