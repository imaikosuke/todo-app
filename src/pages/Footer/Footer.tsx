// src/pages/Footer/Footer.tsx

const Footer = () => {
  return (
    <footer className="flex justify-center text-center text-sm text-gray-500 py-4">
      <p className="pr-10">&copy; 2024 Todoリスト by Imai Kosuke</p>
      <p>
        <a
          href="https://github.com/imaikosuke/todo-app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHubリポジトリ
        </a>
      </p>
    </footer>
  );
}

export default Footer;
