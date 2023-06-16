import express from 'express';
import { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
//route object
const router = express.Router();

//routing
//register method
router.post("/register",registerController);

//login post method
router.post("/login",loginController);

//forgot password POST method

router.post("/forgot-password",forgotPasswordController);

//test router
router.get("/test", requireSignIn,isAdmin, testController);

//protected user route auth

router.get('/userauth',requireSignIn, (req,res) =>{
    res.status(200).send({ok:true});
})

//protected admin route auth

router.get('/admin-auth',requireSignIn,isAdmin, (req,res) =>{
    res.status(200).send({ok:true});
})

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
  );
  

export default router;