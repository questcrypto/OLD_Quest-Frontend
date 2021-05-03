import { useStyle } from './style';
import lynxIcon from 'assets/icons/lynxIcon.svg';
import tokenPocketIcon from 'assets/icons/tokenPocketIcon.svg';
import meetOneIcon from 'assets/icons/meetOneIcon.svg';
import ledgerIcon from 'assets/icons/ledgerIcon.svg';


const Wallet = (props: any) => {

  const wallets = [
    {
      icon: lynxIcon,
      label: 'META MASK'
    },
    {
      icon: lynxIcon,
      label: 'Lynx'
    },
    {
      icon: tokenPocketIcon,
      label: 'Token Pocket'
    },
    {
      icon: meetOneIcon,
      label: 'Meet.One'
    },
    {
      icon: ledgerIcon,
      label: 'Ledger'
    },
  ]

  const classes = useStyle()

  return (
    <>
      { wallets.map((item, i) => {
        return (
          <div key={i} className={classes.walletCont} onClick={props.walletClick(item, i)}>
            <img src={item.icon} alt={item.label} />
            <span>{ item.label }</span>
          </div>
        );
      })}
    </>
  );
}

export default Wallet;