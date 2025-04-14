<!-- src/App.vue -->
<template>
  <div class="webfont2">
    <!-- Header Section -->
    <div id="header">
      <h3 class="webfont2"><a href="index.html">{{ personal.name }}</a></h3>
      <div class="links">
        <label class="hamb webfont2" for="side-menu"><span class="hamb-line"></span></label>
        <nav class="nav webfont2">
          <div class="menu webfont2">
            <a href="AAA.html" class="selected">关于</a>
            <a href="BBB.html" class="lab">简介</a>
            <a href="CCC.html">专业</a>
            <a href="hobbies">爱好</a>
            <a href="experiences">经历</a>
            <a href="others">其他</a>
          </div>
        </nav>
      </div>
    </div>

    <!-- About Section -->
    <div class="about-section">
      <div class="left-section">
        <div class="profile-block">
          <div class="avatar-container">
            <img src="/images/我.jpg" :alt="personal.name" />
          </div>
          
          <div class="profile-info webfont2">
            <h1 class="profile-title">
              <span class="highlight">Hello</span><br />
              大家好，这里是 <span class="highlight">{{ personal.name }}</span><br />
              个人主页!
            </h1>
            <div class="contact-links">
              <a :href="`mailto:${personal.email}`" class="contact-item">
                <i class="fas fa-envelope"></i>
              </a>
              <a href="https://wx.qq.com/" class="contact-item wechat-trigger">
                <i class="fab fa-weixin"></i>
                <div class="qr-code">
                  <img src="/images/wechat-qr.jpg" alt="微信二维码">
                  <p>扫码添加微信</p>
                </div>
              </a>
              <a href="https://im.qq.com" class="contact-item qq-trigger">
                <i class="fab fa-qq"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="institution-info webfont2">
        <p class="position">{{ personal.position }}</p>
        <div v-for="(affiliation, index) in personal.affiliations" :key="index" class="affiliation">
          {{ affiliation.name }}
          <a :href="affiliation.link">{{ affiliation.name.split(' ')[0] }}</a>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="content-section">
      <div class="summary webfont1">
        <p>{{ personal.introduction }}</p>
        <blockquote class="webfont2">
          <p><em class="webfont1">{{ personal.quote }}</em></p>
        </blockquote>
        <p>下面是一些具体的兴趣爱好的介绍:</p>
      </div>

      <div class="themes-container">
        <div class="themes-grid">
          <div v-for="(interest, index) in interests" :key="index" class="theme-card webfont2">
            <a href="#topic-1_eval" class="theme-link">
              <div class="image-container">
                <img :src="interest.image" :alt="interest.title" class="theme-image">
                <h3 class="theme-title static-title">{{ interest.title }}</h3>
              </div>
              <div class="hover-overlay">
                <div class="overlay-content">
                  <h3 class="theme-title hover-title">{{ interest.title }}</h3>
                  <div class="theme-desc">
                    <p class="introduction">{{ interest.description }}</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="summary footer-note webfont2">
        <p>如果你有和我相同的爱好或者想进一步了解我，可以添加我的联系方式呦 电话六个8八个6！ <span class="highlight">我相信相互之间的交流与互动会使所有人得到进步！</span></p>
      </div>
    </div>

    <!-- Publications Section -->
    <div class="publications-container webfont2">
      <h2>阅读书目</h2>
      <div v-for="(book, index) in books" :key="index" class="publication-card">
        <div class="thumbnail-container">
          <img :src="book.image" :alt="book.title">
        </div>
        <div class="publication-info">
          <div class="publication-title">{{ book.title }}</div>
          <div class="authors-list">
            作者：{{ book.authors }} 
            <span v-if="book.authorsEn" class="primary-author">{{ book.authorsEn }}</span>
          </div>
          <div class="read-date-info">阅读时间：{{ book.readDate }}</div>
          <div class="resources-links">购买链接 :
            <a :href="book.purchaseLink" class="tooltip-icon">
              <i class="fas fa-shopping-cart"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <footer class="back-to-top webfont2" v-show="showBackToTop">
      <a href="#header">↑ 返回顶部</a>
    </footer>
  </div>

</template>

<script>
export default {
  data() {
    return {
      personal: {},
      interests: [],
      books: [],
      showBackToTop: false 
    }
  },
  methods: {
    handleScroll() {
      this.showBackToTop = window.scrollY > 200
    }
  },
  async mounted() {
    try {
      const [personalRes, booksRes] = await Promise.all([
        fetch('/info.json'),
        fetch('/books.json')
      ])
      
      const personalData = await personalRes.json()
      const booksData = await booksRes.json()

      this.personal = personalData.personal || {}
      this.interests = personalData.interests || []
      this.books = booksData.books || []
    } catch (error) {
      console.error('数据加载失败:', error)
    }

    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style src="./assets/style.css"></style>