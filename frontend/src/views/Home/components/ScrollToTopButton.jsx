import '@radix-ui/themes/styles.css';
import { ArrowUpIcon } from '@radix-ui/react-icons';

const ScrollToTopButton = () => {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={handleScrollToTop}
            className="fixed bottom-3 right-8 bg-sky-800 text-white p-3
      rounded-full shadow-lg shadow-slate-900 hover:bg-sky-600 transition"
        >
            <ArrowUpIcon width={'17'} height={'17'} />
        </button>
    );
};

export default ScrollToTopButton;