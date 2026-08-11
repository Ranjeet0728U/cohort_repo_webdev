import crypto from 'crypto';

const generateRestToken = async () =>{
    const rawToken = crypto.randomBytes(32).toString("hex");

    const HashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    console.log(rawToken);
    console.log(HashedToken);

    return {rawToken, HashedToken};
}
