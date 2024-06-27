import { Box } from '@chakra-ui/react';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import CheckAdminIsLoggedIn from './pages/CheckAuth/CheckAdminIsLoggedIn';
import CheckUserIsLoggedIn from './pages/CheckAuth/CheckUserIsLoggedIn';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/Dashboard';
import BecomeAAdmin from './pages/Earning/BecomeAAdmin';
import BecomeALocalAgent from './pages/Earning/BecomeALocalAgent';
import BecomeAMasterAgent from './pages/Earning/BecomeAMasterAgent';
import BecomeAPartner from './pages/Earning/BecomeAPartner';
import BecomeAPeddler from './pages/Earning/BecomeAPeddler';
import BecomeAPublisher from './pages/Earning/BecomeAPublisher';
import BecomeASeller from './pages/Earning/BecomeASeller';
import BecomeASuperAgent from './pages/Earning/BecomeASuperAgent';
import BuyALottery from './pages/Earning/BuyALottery';
import CheckLottery from './pages/Earning/CheckLottery';
import InvestSystem from './pages/Earning/InvestSystem';
import Footer from './pages/Footer';
import BuyingHistory from './pages/History/BuyingHistory';
import DepositHistory from './pages/History/DepositHistory';
import EarningHistory from './pages/History/EarningHistory';
import LotteryHistory from './pages/History/LotteryHistory';
import TransactionHistory from './pages/History/TransactionHistory';
import TransferHistory from './pages/History/TransferHistory';
import WithdrawalHistory from './pages/History/WithdrawalHistory';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ResponsiveMenu from './pages/Menu/Menu';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import SignUp from './pages/SignUp';
import TermsAndCondition from './pages/TermsAndCondition';
import WinnerPage from './pages/WinnerPage';
import AccountAddress from './pages/account/AccountAddress';
import AccountAdmin from './pages/account/AccountAdmin';
import AccountInformation from './pages/account/AccountInformation';
import LocalAdmin from './pages/account/AccountLocalAdmin';
import MasterAdmin from './pages/account/AccountMasterAdmin';
import AccountPartner from './pages/account/AccountPartner';
import AccountPeddler from './pages/account/AccountPeddler';
import AccountPublisher from './pages/account/AccountPublisher';
import AccountSeller from './pages/account/AccountSeller';
import SuperAdmin from './pages/account/AccountSuperAdmin';
import AccountUsers from './pages/account/AccountUsers';
import PrizePage from './pages/prizePage';
import AddBackupPassword from './pages/settings/AddBackupPassword';
import AddCouponCode from './pages/settings/AddCoupon';
import AddCurrency from './pages/settings/AddCurrency';
import AddDepositWallet from './pages/settings/AddDepositWallet';
import AddSystemLottery from './pages/settings/AddSystemLottery';
import BalanceTransferPage from './pages/settings/BalanceTransfer';
import Deposit from './pages/settings/Deposit';
import DepositRequest from './pages/settings/DepositRequest';
import SettingsTransferEarning from './pages/settings/TransferEarning';
import UpdatePassword from './pages/settings/UpdatePassword';
import WithdrawalPage from './pages/settings/Withdrawal';
import WithdrawalRequest from './pages/settings/WithdrawalRequest';


const appComponentMainRouter = createBrowserRouter([
  
  {
    path: '/', 
    element: <Box>
              <ResponsiveMenu/>
              <LandingPage/>
            </Box>
  },
  {
    path: '/winner', 
    element: <WinnerPage/>
  }, 
  {
    path: '/prize', 
    element: <PrizePage/>
  },  
  {
    path: '/privacy-policy', 
    element: <PrivacyPolicy/>
  },
  {
    path: '/refund-policy', 
    element: <RefundPolicy/>
  },
  {
    path: '/terms-and-condition', 
    element: <TermsAndCondition/>
  },
  {
    path: '/login', 
    element: <Login/>
  }, 
  {
    path: '/signup', 
    element: <SignUp/>
  },

  {
    path: '/account/dashboard', 
    element: <CheckUserIsLoggedIn> <Dashboard/> </CheckUserIsLoggedIn>
  },
  {
    path: '/account/address', 
    element: <CheckUserIsLoggedIn> <AccountAddress/> </CheckUserIsLoggedIn>
  },
  {
    path: '/account/information', 
    element: <CheckUserIsLoggedIn> <AccountInformation/> </CheckUserIsLoggedIn>
  }, 
  {
    path: '/account/users', 
    element: <CheckAdminIsLoggedIn> <AccountUsers/> </CheckAdminIsLoggedIn>
  }, 
  {
    path: '/account/super-admin', 
    element: <CheckAdminIsLoggedIn> <SuperAdmin/>  </CheckAdminIsLoggedIn>
  }, 
  {
    path: '/account/master-admin', 
    element: <CheckAdminIsLoggedIn> <MasterAdmin/>  </CheckAdminIsLoggedIn>
  }, 
  {
    path: '/account/local-admin', 
    element: <CheckAdminIsLoggedIn> <LocalAdmin/>  </CheckAdminIsLoggedIn>
  }, 
  {
    path: '/account/admin', 
    element:  <CheckAdminIsLoggedIn> <AccountAdmin/> </CheckAdminIsLoggedIn>
  },
  {
    path: '/account/seller', 
    element:  <CheckAdminIsLoggedIn>  <AccountSeller/>  </CheckAdminIsLoggedIn>
  },
  {
    path: '/account/publisher', 
    element:  <CheckAdminIsLoggedIn> <AccountPublisher/>  </CheckAdminIsLoggedIn>
  },
  {
    path: '/account/peddler', 
    element:  <CheckAdminIsLoggedIn> <AccountPeddler/>  </CheckAdminIsLoggedIn>
  },
  {
    path: '/account/partner', 
    element:  <CheckAdminIsLoggedIn> <AccountPartner/> </CheckAdminIsLoggedIn>
  },
  {
    path: '/history/transaction-history', 
    element: <TransactionHistory/>
  },
  {
    path: '/history/earning-history', 
    element: <EarningHistory/>
  },
  {
    path: '/history/withdrawal-history', 
    element: <WithdrawalHistory/>
  },
  {
    path: '/history/deposit-history', 
    element: <DepositHistory/>
  },
  {
    path: '/history/transfer-history', 
    element: <TransferHistory/>
  },
  {
    path: '/history/lottery-history', 
    element: <CheckUserIsLoggedIn> <LotteryHistory/> </CheckUserIsLoggedIn>
  },
  {
    path: '/history/buying-history', 
    element: <BuyingHistory/>
  },
  {
    path: '/settings/deposit', 
    element: <CheckUserIsLoggedIn> <Deposit/> </CheckUserIsLoggedIn>
  },
  {
    path: '/settings/deposit-request', 
    element: <CheckAdminIsLoggedIn> <DepositRequest/> </CheckAdminIsLoggedIn>
  },
  {
    path: '/settings/add-currency', 
    element: <CheckAdminIsLoggedIn> <AddCurrency/> </CheckAdminIsLoggedIn>
  },
  {
    path: '/settings/add-wallet', 
    element: <CheckAdminIsLoggedIn> <AddDepositWallet/> </CheckAdminIsLoggedIn> 
  },
  {
    path: '/settings/add-system-lottery', 
    element: <CheckAdminIsLoggedIn> <AddSystemLottery/> </CheckAdminIsLoggedIn> 
  },
  {
    path: '/settings/add-coupon',  
    element: <CheckAdminIsLoggedIn> <AddCouponCode/> </CheckAdminIsLoggedIn> 
  },
  {
    path: '/settings/withdrawal', 
    element: <CheckUserIsLoggedIn> <WithdrawalPage/> </CheckUserIsLoggedIn> 
  },
  {
    path: '/settings/withdrawal-request', 
    element: <CheckAdminIsLoggedIn> <WithdrawalRequest/> </CheckAdminIsLoggedIn> 
  },
  {
    path: '/settings/balance-transfer', 
    element: <CheckUserIsLoggedIn> <BalanceTransferPage/> </CheckUserIsLoggedIn>
  },
  {
    path: '/settings/transfer-earning', 
    element:  <CheckUserIsLoggedIn> <SettingsTransferEarning/> </CheckUserIsLoggedIn>
  },
  {
    path: '/settings/backup-password', 
    element: <CheckUserIsLoggedIn> <AddBackupPassword/> </CheckUserIsLoggedIn>
  },
  {
    path: '/settings/update-password', 
    element: <CheckUserIsLoggedIn> <UpdatePassword/> </CheckUserIsLoggedIn>
  },  
  {
    path: '/earning/buy-a-lottery', 
    element: <CheckUserIsLoggedIn> <BuyALottery/>  </CheckUserIsLoggedIn>
  },
  {
    path: '/earning/check-lottery', 
    element: <CheckUserIsLoggedIn> <CheckLottery/>  </CheckUserIsLoggedIn>
  }, 
  {
    path: '/earning/become-a-seller', 
    element: <CheckUserIsLoggedIn> <BecomeASeller/> </CheckUserIsLoggedIn>
  }, 
  {
    path: '/earning/become-a-local-agent', 
    element: <CheckUserIsLoggedIn> <BecomeALocalAgent/> </CheckUserIsLoggedIn>
  }, 
  {
    path: '/earning/become-a-master-agent', 
    element: <CheckUserIsLoggedIn> <BecomeAMasterAgent/> </CheckUserIsLoggedIn>
  }, 
  {
    path: '/earning/become-a-super-agent', 
    element: <CheckUserIsLoggedIn> <BecomeASuperAgent/> </CheckUserIsLoggedIn>
  }, 
  {
    path: '/earning/become-a-admin', 
    element: <CheckUserIsLoggedIn> <BecomeAAdmin/> </CheckUserIsLoggedIn>
  }, 
  {
    path: '/earning/become-a-publisher', 
    element: <CheckUserIsLoggedIn> <BecomeAPublisher/> </CheckUserIsLoggedIn>
  }, 
  {
    path: '/earning/become-a-partner', 
    element: <CheckUserIsLoggedIn> <BecomeAPartner/> </CheckUserIsLoggedIn>
  }, 
  {
    path: '/earning/become-a-peddler', 
    element: <CheckUserIsLoggedIn> <BecomeAPeddler/> </CheckUserIsLoggedIn>
  }, 
  {
    path: '/earning/invest-system', 
    element: <CheckUserIsLoggedIn> <InvestSystem/> </CheckUserIsLoggedIn>
  }, 
  {
    path: 'contact-us', 
    element:  <Box>
                <ContactUs/>
                <Footer/>
              </Box>
  }, 
]);

export default appComponentMainRouter;