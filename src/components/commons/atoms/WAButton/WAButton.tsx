import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const WAButton = () => {
    return (
        <a href="https://wa.me/6285693415051" target="_blank" rel="noopener noreferrer" className="size-12 fixed bottom-7 right-7 z-50 bg-[var(--color-gold)] p-2 rounded-full transition-all duration-300 ease-in-out hover:bg-[var(--color-gold-light)]">
            <span className="absolute top-1/2 left-1/2 -translate-1/2">
                <FontAwesomeIcon icon={faWhatsapp} className="text-3xl text-[var(--color-bg)]" />
            </span>
        </a>
    )
}

export default WAButton