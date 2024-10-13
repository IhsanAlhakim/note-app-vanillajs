const About = {
  render() {
    return `
        <div class="about-title">
        <h2>About Note App</h2>
        </div>
        <section class="about-content">
          <p>
            This Note app is a website created by me using HTML5, CSS, and vanilla javascript
            to learn front-end
          </p>
        </section>        
        `;
  },

  afterRender() {
    return;
  },
};

export default About;
