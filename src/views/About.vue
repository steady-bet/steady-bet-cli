<template>
  <div class="about">
    <h1>Welcome on steadybet</h1>
    <h2>How to meet the community</h2>
      Feel free to join us on <a href="https://discord.gg/H4tzwWP">discord</a>
    <h2>What are we building</h2>
    <p>We have many goals with developping this Dapp</p>
    <ul>
      <li>
        We aim to develop a new solution for sport betting with very fast transaction support.
        To achieve this, we selected CREDITS blockchain and each bet is registered in real time in the blockchain in a specific smartcontract.
        The first step is to build a demo App that will run with Credits Testnet.
      </li>
      <li>
        A second step is to continue to improve this Dapps and bring many new features.
      </li>
      <li>
        Last, if this bet site get attraction and we are confident to push it to live we will consider to raise funds. This will be done when the application
        will be fully ready and most of the essential features implemented. Kind of Dapp ready instead of whitepaper paradigm.
      </li>
    </ul>
    <h2>Project status</h2>
      <p>This project is not yet stable and still under developments.</p>
      <p>
        We decided to publish it as main features are starting to work (may be still with some bugs but it s possible to bet and get rewards)
        This will also help for the most curious to follow the building of this project and also see another project working on Credits blockchain and use some smartcontracts. 
        Credits blockchain is fast and we choose this blockchain to improve user experience and have bets working in real time.
      </p>
    <h2>How it works</h2>
      <p>
        This is Dapp for Peer to Peer betting. That means there is no bookmakers and bet odds are directly calculated from bet made by users.
        At first there, when match and smartcontract is just created the screen do not display any odd. When first user bet on a team, this team will be marked
        with 100% as for now all bets are set on this team. When other bets will come on other result, the odd will automatically adjust.
      </p>
      <p>
        Match selection and smartcontract deployments are automatically made with a selection of most famous team in Europ. This selection is easy to configure and can change over time if needed.
        Also keep in mind that this selection is made to limit the number of matches. This way we think these matches will receive more bets and will be more interesting to follow.
      </p>
      <p>
        The smartcontract contains all bets, everyone can check on blockchain the total bet balance on monitor by checking account list and give contract address.
      </p>
      <p>
        When a match is finished, we get the result automatically from external data sources and we call the method that will finalize the smartcontract and compute
        winners and loosers list. Then payments are automatically done.
      </p>
      <p>
        Winners share the whole smartcontract balance minus some devs fee.
      </p>
    <h2>Personal wallet and server side wallet - to be done</h2>
    <p> As they are no perfect solution to secure sensitive data on client side (See for exemple MyEtherWallet disclaimer), we decided to create along with the user account a new wallet on server side.
        This server side wallet is automatically created with user account. Private key is split into 2 parts and each part of the private key is encrypt with 2 differents secret key loaded from 2 different way
        to make it harder for any hacker to retreive the key on our system. Also, when the user register his information, we ask for a PIN code. This pin code should not be forget
        by the user because we <b>never store it</b>. This pin code is used to modify our 2 secret key used to encrypt your private key, that means that even if devs know secret key we just can't decrypt the user's private key.
        That's why if you loose your PIN code we just can't unlock anymore your server side wallet. </p>
        <p> This is a general behaviour to have, try to always split your amount of crypto into smaller wallet, moreover when you fill private keys on website.
          For exemple, if you use and external wallet and fill private key for betting or if you use our server side wallet, feel free when balance is high to send back funds to one of your main wallets.
          This is true here but on any crypto website.</p>
    <h2>What are the features on which the team is currently working on ?</h2>
    <ul>
      <li>
        improving and fixing existing pages
      </li>
      <li>
        improve layout for bet history + refactoring of user bet storage
      </li>
      <li>
        build the final test server
      </li>
      <li>
        create server side wallet
      </li>
      <li>
        create the profile page and easy transfer between your server and personal wallet
      </li>
      <li>
        refactoring of the whole site with bootstrap to make the Dapp multi-device friendly.
      </li>
    </ul>
  </div>
</template>

<style scoped>
.about{
  text-align: left;
  margin-left: 10%;
  margin-right: 20%;
}
</style>
