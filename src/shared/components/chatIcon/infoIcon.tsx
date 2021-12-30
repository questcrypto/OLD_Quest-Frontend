import { TextIcon , UseStyle} from './styles'

export default function infoIcon() {
    const classes = UseStyle()
    return(
        <TextIcon className={classes.infoIcon}>
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z" fill="black" fill-opacity="0.54"/>
                </svg>
        </TextIcon>
    )
}
