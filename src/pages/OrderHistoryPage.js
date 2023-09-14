import * as userService from '../utils/users-service';


function OrderHistory() {
  const handleCheckToken = async ()=>{
    const expDate = await userService.checkToken()
    console.log(expDate)
  }
 
  return (
    <div>
      <h1>Order History Page</h1>
      <button onClick={handleCheckToken}> Check When my Login Expires</button>
    </div>
  );
}

export default OrderHistory;