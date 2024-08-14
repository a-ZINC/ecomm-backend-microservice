import axios from 'axios';
import { GOOGLE_OAUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_CALLBACK_URL, GOOGLE_OAUTH_SCOPES } from '../utils';
import qs from 'qs';
import prisma from '../prisma';

export const auth = (req: any, res: any) => {
    const state = "some_state";
    const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
    const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
    res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
}

export const oauthCallback = async(req: any, res: any) => {
    console.log(req.query);
  console.log(process.env)
  const { code } = req.query;
  const data = {
    code,

    client_id: GOOGLE_CLIENT_ID,

    client_secret: process.env.GOOGLE_CLIENT_SECRET,

    redirect_uri: GOOGLE_CALLBACK_URL,

    grant_type: "authorization_code",
  };

  console.log(data);

  // exchange authorization code for access token & id_token
  const query_String  = qs.stringify(data);
  const access_token_data = await axios.post("https://oauth2.googleapis.com/token", query_String, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }});
  const { id_token } = access_token_data.data;
  console.log(id_token);

  const token_info_response = await axios.get(
    `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }});
  console.log(token_info_response.data);

  const user = await prisma.customer.findFirst({
    where: {
      email: token_info_response.data.email,
    }
  })
  console.log(user);

  if(!user) {
    const customer = await prisma.customer.create({
      data: {
        email: token_info_response.data.email,
        name: token_info_response.data.name,
      }
    });
    console.log(customer);
  }

  res.status(200).json(user);
}