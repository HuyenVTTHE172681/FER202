const headerData = ["Home", "Shop", "About us", "Contact"];

// Sủ dụng cú pháp Function để định nghĩa Component
function Header() {
  return (
    <header>
      <ul>
        {
            headerData?.map((item) => {
            return <li key={item}>{item}</li>;
            })
        }
      </ul>
    </header>
  );
}

export default Header;
