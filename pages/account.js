const Account = ({account}) => {
  return (
    <div>
      <h1>Account info </h1>
      <span>ID: { account.id }</span><br />
      <span>Name: { account.name }</span><br />
      <span>Full name: { account.full_name }</span>
    </div>
  )
};

export default Account;
  
export async function getServerSideProps() {
  // This is a sample api for loading data
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
    
  const account = await res.json();
  const slicedAccountData = Object.keys(account).slice(0, 5).reduce((result, key) => {
    result[key] = account[key];
    return result;
  }, {});

  return {
    props: {
      account: slicedAccountData,
    },
  };
}
