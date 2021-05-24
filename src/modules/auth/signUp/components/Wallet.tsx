import { useStyle } from './style';
import metaMaskIcon from 'assets/images/metamask.jpg';
import lynxIcon from 'assets/icons/lynxIcon.svg';
import tokenPocketIcon from 'assets/icons/tokenPocketIcon.svg';
import meetOneIcon from 'assets/icons/meetOneIcon.svg';
import ledgerIcon from 'assets/icons/ledgerIcon.svg';


const Wallet = (props: any) => {

  const { walletClick } = props;

  const wallets = [
    {
      icon: metaMaskIcon,
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
          <div key={i} className={classes.walletCont} onClick={() => walletClick(item)}>
            <img src={item.icon} alt={item.label} />
            <span>{ item.label }</span>
          </div>
        );
      })}
    </>
  );
}

export default Wallet;