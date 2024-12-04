function Excersise_5() {
  return (
    <section className="container_ex5">
      <header className="header_ex5">
        <img src="https://picsum.photos/200/300" alt="" />
        <ul className="menu_ex5">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </header>
      <main className="main_ex5">
        {/* About */}
        <div className="about">
          <h4 className="title_menu">About</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
        </div>

        {/* Contact */}
        <div className="contact">
          <h4 className="title_menu">Contact</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
        </div>
      </main>

      <footer className="footer_ex5">
        <p>&copy;Footer content</p>
      </footer>
    </section>
  );
}

export default Excersise_5;
