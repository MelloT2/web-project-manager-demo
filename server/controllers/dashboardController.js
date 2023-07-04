
const Card = require('../models/Card');
const ChatMessage = require('../models/Message')
const User = require("../models/User");
const UUser = require("../models/UUser");
const Board = require('../models/Board')
/**
 * GET/
 * Dashboard
 */
exports.dashboardPage = async (req, res) => {
    const locals = {
        title: 'Dashboard'
      };
    
      try {
        //get data from boards cards
        const cards = await Card.find({});
        //get data from boards
        const boards = await Board.find({})
        console.log(`บอร์ด: ${boards}`);
    
        const user = req.user;
    
        // Fetch UUser data and populate req.uuser
        const uuser = await UUser.findById(req.session.userId)
    
        let displayName = '';
    
        if (user && user.displayName) {
          displayName = user.displayName;
        } else if (uuser && uuser.displayName) {
          displayName = uuser.displayName;
        }
    
        res.render('dashboard', {
            userName: displayName,
            userName02: displayName,
            locals,
            boards,
            cards: cards.map(card => card.toJSON()),
            layout: '../views/layouts/main'
          });
        } catch (error) {
          // console.log(error);
        }
      };

/**
 * GET /
 * View Specific Card
 */
// where({ user: req.user.id })
exports.dashboardPageViewCard = async(req, res) => {
    const card = await Card.findById({ _id: req.params.id }).lean();
    
    if (card) {
        res.render('view-card', {
            cardID: req.params.id,
            card,
            layout: '../views/layouts/view-card'
        })
    } else {
        res.send("Something went wrong.")
    }
}
/**
 * PUT /
 * Update Specific Card
 */
exports.dashboardUpdateViewCard = async(req, res) => {

    try {
        await Card.findOneAndUpdate(
            { _id: req.params.id },
            { 
              title: req.body.title,
              body: req.body.body,
              responsiblePerson: req.body.responsiblePerson,
              deadline: req.body.deadline,
              workstatus: req.body.workstatus,
              updateAt: Date.now()
             })

            res.redirect('/dashboard');
    } catch (error) {
        // console.log(error);
    }
}


/**
 * DELETE /
 * Delete Specific Card
 */
exports.dashboardDeleteCard = async(req, res) => {

    try {
        await Card.deleteOne({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch (error) {
        // console.log(error);
    }
}

/**
 * GET /
 * ADD Card
 */
exports.dashboardAddCard = async(req, res) => {
    res.render('add', {
        layout: '../views/layouts/add-card'
    })
}

/**
 * POST /
 * ADD Card
 */
exports.dashboardAddCardSubmit = async function (req, res) {
    // Extract the necessary data from the request body
    const { boardTitle, userId, title, responsiblePerson, deadline, workstatus } = req.body;
  
    const board = await Board.findOne({ board_title: boardTitle });
    // Create a new Card object with the required fields
    const newCard = new Card({
      board: board._id,
      user: userId,
      title: title,
      responsiblePerson: responsiblePerson,
      deadline: deadline,
      workstatus: workstatus
    });
  
    // Save the new Card object to the database
    newCard.save(function (err) {
      if (err) {
        console.log(err);
        return;
      }
      res.redirect('/dashboard');
    });
  };


/**
 * GET /
 * Search
 */
exports.dashboardSearch = async(req, res) => {
    try {
        res.render('search', {
            searchResults: '',
            layout: '../views/layouts/search-card'
        })
    } catch (error) {
        // console.log(error);
    }
}


/**
 * POST /
 * Search For Notes
 */
exports.dashboardSearchSubmit = async(req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9ก-๙]/g, "");

        const searchResults = await Card.find({
            $or: [
                { title: {$regex: new RegExp(searchNoSpecialChars, 'i') }},
                { body: {$regex: new RegExp(searchNoSpecialChars, 'i') }},
              ]
        })
        // .where({ user: req.user.id });

        res.render('search', {
            searchResults,
            layout: '../views/layouts/search-card'
        })

    } catch (error) {
        // console.log(error);
    }
}

/**
 * GET/
 * Timeline
 */
exports.timelinePage = async (req, res) => {
    const locals = {
        title: 'Timeline'
    }
    try {
        const cards = await Card.find({});
        console.log(cards);   

        res.render('timeline', {
            // userName: req.users.firstName,
            locals,
            cards,
            layout: '../views/layouts/timelinelo'
        });
    } catch (error) {
        // console.log(error)
    }
}

/**
 * GET /
 * ADD Board
 */
exports.dashboardAddboard = async(req, res) => {
    res.render('dashboard', {
        layout: '../views/layouts/main'
    })
}
/**
 * POST /
 * ADD Board
 */
exports.dashboardAddboardSubmit = async (req, res) => {
    try {
      const { board_title, owners } = req.body;
  
      // Assuming owners is an array of user IDs from both User and Uuser models
      const board = (await Board.create({ board_title })).$where;
  
      res.redirect('/dashboard');
    } catch (error) {
      // console.log(error);
    }
  };
//  

exports.boardPage = async (req, res) => {
    try {
      const boardId = req.params.boardId;
      const user = req.user;
    
        // Fetch UUser data and populate req.uuser
        const uuser = await UUser.findById(req.session.userId)
    
        let displayName = '';
    
        if (user && user.displayName) {
          displayName = user.displayName;
        } else if (uuser && uuser.displayName) {
          displayName = uuser.displayName;
        }
      
      // Fetch the board data
      const boards = await Board.findById(boardId)
      const boardsSide = await Board.find({})
      if (!boards) {
        // Handle error when board is not found
        return res.status(404).render('error', { message: 'Board not found' });
      } else {
        // Fetch the cards associated with the board
        const cards = await Card.find({ board: boardId })
        
        // Render the board page with the board and cards data
        res.render('board', { 
        userName: displayName,
        userName02: displayName,
        boards,
        boardsSide,
        cards,
        layout: '../views/layouts/boards'});
      }
    } catch (error) {
      // Handle error
      // console.error(error);
      res.status(500).render('error', { message: 'Server Error' });
    }
  };



