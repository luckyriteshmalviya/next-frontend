import { useEffect } from 'react';

const useWindowHeight = (ref, property) => {
    
    useEffect(() => {
        ref.current && initialization();
        window.addEventListener('resize', debouncedHandleResize);
        return () => window.removeEventListener('resize', debouncedHandleResize);
    }, [ref.current]);

    const initialization = () => {
        if (document.documentElement.clientWidth < 767) {
            if (property) {
                ref.current.style[property] = `${document.documentElement.clientHeight}px`;
            } else {
                ref.current.style.minHeight = `${document.documentElement.clientHeight}px`;
            }
        }
    }

    function debounce(fn, ms) {
        let timer;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                fn.apply(this, arguments);
            }, ms);
        };
    }

    const debouncedHandleResize = debounce(function handleResize() {
        if (document.documentElement.clientWidth < 500) {
            if (property) {
                ref.current.style[property] = `${document.documentElement.clientHeight}px`;
            } else {
                ref.current.style.minHeight = `${document.documentElement.clientHeight}px`;
            }
        } else {
            if (property) {
                ref.current.style[property] = `100vh`;
            } else {
                ref.current.style.minHeight = `100vh`;
            }
        }
    }, 500);
}

export default useWindowHeight;