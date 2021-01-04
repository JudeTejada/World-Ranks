import styles from './searchInput.module.css';
import SearchRounded from '@material-ui/icons/SearchRounded';


const SearchInput = ({...rest}) => {

    return<div className={styles.wrapper}>
        <SearchRounded color='inherit' />
        <input className={styles.input} {...rest} />
    </div>
}

export default SearchInput;