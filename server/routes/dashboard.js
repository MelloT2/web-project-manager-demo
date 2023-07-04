const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/checkAuth');
const dashboardController = require('../controllers/dashboardController'); 

router.get('/dashboard', isLoggedIn, dashboardController.dashboardPage);
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardPageViewCard);
router.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateViewCard);
router.delete('/dashboard/item-delete/:id', isLoggedIn, dashboardController.dashboardDeleteCard);
router.get('/dashboard/add', isLoggedIn, dashboardController.dashboardAddCard);
router.post('/dashboard/add', isLoggedIn, dashboardController.dashboardAddCardSubmit);

router.get('/dashboard/search', isLoggedIn, dashboardController.dashboardSearch);
router.post('/dashboard/search', isLoggedIn, dashboardController.dashboardSearchSubmit);
router.get('/timeline', isLoggedIn, dashboardController.timelinePage);

// router.get('/chat/room/:id', dashboardController.chatPage);
// router.post('/chat/room/:id', dashboardController.saveChatMessage);

// ADD BOARD ROUTE
router.get('/dashboard/add-board', isLoggedIn, dashboardController.dashboardAddboard);
router.post('/dashboard/add-board', isLoggedIn, dashboardController.dashboardAddboardSubmit);
router.get('/dashboard/board/:boardId', isLoggedIn, dashboardController.boardPage);


module.exports = router;
