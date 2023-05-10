import users from "../models/users.js";

export const LoginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const findUser = await users.find({email: email, password: password});
    if(findUser){
        res.send(findUser);
    }else{
        res.sendStatus(400);
    }

}

export const RegisterUser = async (req, res) => {
    
    const photo = req.body.photo;
    const name = req.body.name;
    const bio = req.body.bio;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = await new users({
        photo: photo,
        name: name,
        bio: bio,
        phone: phone,
        email: email,
        password:password
    })

    newUser.save();

    res.send(newUser);

}

export const Details = async (req, res) => {

    const id = req.params.id;

    console.log(id);
        try{
            const userDetails = await users.find({_id: id});
            res.send(userDetails);
        }catch(error){
            console.log(error);
        }

}

export const EditUser = async (req, res) => {

    const id = req.params.id;

    const photo = req.body?.photo;

    const name = req.body?.name;

    const bio = req.body?.bio;
        
    const phone = req.body?.phone;
    
    const email = req.body?.email;

    const password  = req.body?.password;


        try{
    
            const userUpdate = await users.updateOne({_id: id},
                {$set : {
                    photo: photo,
                    name: name,
                    bio: bio,
                    phone: phone,
                    email: email,
                    password: password
                }
        })

            res.send(userUpdate);
        }catch(error){
            console.log(error);
        }

}
