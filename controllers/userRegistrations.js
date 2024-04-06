const bcrypt = require('bcrypt')
const userRegistration = require('../models/userSchema');
const colleagueRegistration = require('../models/colleagueSchema');
const userSchema = require('../models/userSchema');
const colleagueSchema = require('../models/colleagueSchema');

//Sign-up Controller
const signup = async(req,res)=> {
    try{
        const { First_Name, Last_Name, email, password} = req.body;

        // Check if the user already exists
        const existingUser = await userRegistration.findOne({email});
        if(existingUser){
            return res.status(400).json({error: 'User already exists'});
        }

        //Hash the password 
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create a new user
        const newUser = new userSchema({
            First_Name,
            Last_Name,
            email,
            password: hashedPassword,
        })

        // Save the user to the DB
        await newUser.save();

        res.status(200).json({
            message: 'User created successfully', user: 
            newUser._id,
            code: '200'
        });
    } catch (error){
        console.log('Error during sign-up', error);
        res.status(200).json({
            error: 'Internal Server Error',
            code: '500'
        });
    }
}


const colleagueSignup = async(req,res)=> {
    try{
        const { First_Name, Last_Name, email, password} = req.body;

        // Check if the user already exists
        const existingUser = await colleagueRegistration.findOne({email});
        if(existingUser){
            return res.status(200).json({error: 'Colleague already exists', code: '400'});
        }

        //Hash the password 
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create a new user
        const newColleague = new colleagueSchema({
            First_Name,
            Last_Name,
            email,
            password: hashedPassword,
        })

        // Save the user to the DB
        await newColleague.save();

        res.status(200).json({
            message: 'User created successfully', user: 
            newColleague._id,
            code: '200'
        });
    } catch (error){
        console.log('Error during sign-up', error);
        res.status(200).json({
            error: 'Internal Server Error',
            code: '500'
        });
    }
}

//Login-Controller
const login = async(req,res)=>{
    try{
        const {email, password} = req.body;
        //Find user by email
        const user = await userRegistration.findOne({email});

        const userId = user._id;

        if(!user){
            return res.status(200).json({error: 'Inavalid crediantials', code: '401'});
        }

        // Compare entered password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(200).json({
                message: 'Inavlid credentials',
                code: '401'
            });
        }

        res.status(200).json({
            message: 'User logged in successfully',
            userId: userId,
            firstName: user.First_Name,
            lastName: user.Last_Name,
            email: user.email,
            code: '200'
        });

    } catch(error){
        console.log('Error during login', error);
        res.status(200).json({
            message: 'Internal server Error',
            code: '500'
        });
    }
}

// Colleague login 
const colleagueLogin = async(req,res)=>{
    try{
        const {email, password} = req.body;
        //Find user by email
        const colleague = await colleagueRegistration.findOne({email});

        const colleagueID = colleague._id;

        if(!colleague){
            return res.status(200).json({error: 'Inavalid crediantials', code: '401'});
        }

        // Compare entered password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, colleague.password);

        if(!isPasswordValid){
            return res.status(401).json({
                message: 'Inavlid credentials',
                code: '401'
            });
        }

        res.status(200).json({
            message: 'Colleague logged in successfully',
            userId: colleagueID,
            firstName: colleague.First_Name,
            lastName: colleague.Last_Name,
            email: email,
            code: '200'
        });

    } catch(error){
        console.log('Error during login', error);
        res.status(200).json({
            message: 'Internal server Error',
            code: '500'
        });
    }
}


const getUserData = async(req,res)=>{
    try{
        const {user_id} = req.body;
    
    const user = await userRegistration.findById(user_id);

    if(!user){
        return res.status(200).json({ error: 'User not found', code: '404'});
    }

    const firstName = user.First_Name
        const lastName = user.Last_Name
        const email = user.email

    res.status(200).json({
        First_Name: firstName,
        Last_Name: lastName,
        Email: email,
        code: '200'
    });
    } catch(error){
        console.log(error);
    }
    
}

module.exports = { signup, login, getUserData, colleagueLogin, colleagueSignup};