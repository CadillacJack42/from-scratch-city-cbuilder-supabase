import { render } from './render-utils.js';

const SUPABASE_URL = 'https://cmewyjgphfnmytfmmpjy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDAxOTY4MywiZXhwIjoxOTU1NTk1NjgzfQ.0WT-gqj-qvV0wYfg0QdblxbkS4J4rIq0wf8BI3R45yc';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./city');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}

export const getCity = async() => {
    const city = await client
        .from('cities')
        .select()
        .match({ user_id: client.auth.user().id })
        .single();
    return checkError(city);
};

export const createDefaultCity = async() => {
    const newCity = await client
        .from('cities')
        .insert([{
            name: 'Las Vegas',
            water: 1,
            skyline: 1,
            castle: 1,
            slogans: ['The City of Sin']
        }]);
    return checkError(newCity);
};

export const updateImage = async(key, value) => {
    await client    
        .from('cities')
        .update({ [key] : value })
        .match({ user_id: client.auth.user().id });
    render(await getCity());
};

export const updateSlogans = async(val) => {
    await client    
        .from('cities')
        .update({ slogans : val })
        .match({ user_id: client.auth.user().id });
    render(await getCity());
};

export const updateName = async(val) => {
    await client    
        .from('cities')
        .update({ name : val })
        .match({ user_id: client.auth.user().id });
    render(await getCity());
};

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
