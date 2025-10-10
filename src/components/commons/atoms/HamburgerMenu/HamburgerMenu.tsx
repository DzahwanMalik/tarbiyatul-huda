const HamburgerMenu = () => {
  return (
    <button className="p-1 rounded-sm cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-10 text-[var(--color-gold)] transform transition-all duration-300 ease-in-out hover:text-[var(--color-gold-light)] hover:scale-110"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
        />
      </svg>
    </button>
  );
};

export default HamburgerMenu;
