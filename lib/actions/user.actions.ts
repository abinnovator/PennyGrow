"use server";

import { ID,Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    
    // Creating a session
    const response = await account.createEmailPasswordSession(email, password);
    
    // Check if the response contains the session token
    if (!response) {
      throw new Error('Session creation failed');
    }

    // Set the session in cookies
    cookies().set("appwrite-session", response.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(response);  // Return parsed response
  } catch (error) {
    console.error('Error while signing in:', error);
    return { error: 'Failed to create session', details: error };
  }
};


export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;
  
  try {
    const { account } = await createAdminClient();
    
    const newUserAccount = await account.create(
      ID.unique(), 
      email, 
      password, 
      `${firstName} ${lastName}`
    );

    // Create a session without setting cookies
    await account.createEmailPasswordSession(email, password);
    
    return parseStringify(newUserAccount);
  } catch (error) {
    console.error('Error', error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();

    const user = await account.get();
    
    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();
    
    // Directly delete the session without cookies
    await account.deleteSession('current');
  } catch (error) {
    console.error('Error logging out:', error);
    return null;
  }
};

export const signUp2 = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName } = userData;
  
  let newUserAccount;

  try {
    const { account, database } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(), 
      email, 
      password, 
      `${firstName} ${lastName}`
    );

    if (!newUserAccount) throw new Error('Error creating user');
    
    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        balance: 0,
      },
    );

    // Create a session without setting cookies
    await account.createEmailPasswordSession(email, password);
    
    return parseStringify(newUser);
  } catch (error) {
    console.error('Error', error);
  }
};

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();
    
    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    );
    
    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const addMoneyToUserBalance = async ({ userId, amount }: { userId: string; amount: number }) => {
  try {
    const { database } = await createAdminClient();

    // Get the current user document
    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    );

    if (user.documents.length === 0) {
      throw new Error('User not found');
    }

    const userDocument = user.documents[0];

    // Calculate new balance
    const newBalance = (userDocument.balance || 0) + amount;

    // Update the user's balance in the document
    const updatedUser = await database.updateDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      userDocument.$id,
      { balance: newBalance }
    );

    return parseStringify(updatedUser);
  } catch (error) {
    console.error('Error updating user balance', error);
  }
};

export const addTransaction = async ({
  userId,
  amount,
  category,
  name
}: {
  userId: string;
  amount: number;
  category: string;
  name: string;
}) => {
  try {
    const { database } = await createAdminClient();

    // Get the current user document
    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    );

    if (user.documents.length === 0) {
      throw new Error('User not found');
    }

    const userDocument = user.documents[0];

    // Prepare transaction data
    const newTransaction = {
      amount: amount,
      category: category,
      name: name,
    };

    // Update the user's transactions
    const updatedUser = await database.updateDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      userDocument.$id,
      {
        Transactions: [
          ...(userDocument.Transactions || []),
          newTransaction.name
        ],
        Transaction_categories: [
          ...(userDocument.Transaction_categories || []),
          newTransaction.category
        ],
        Transaction_amounts: [
          ...(userDocument.Transaction_amounts || []),
          newTransaction.amount
        ]
      }
    );

    return parseStringify(updatedUser);
  } catch (error) {
    console.error('Error adding transaction', error);
  }
};

export const subtractMoneyToUserBalance = async ({ userId, amount }: { userId: string; amount: number }) => {
  try {
    const { database } = await createAdminClient();

    // Get the current user document
    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    );

    if (user.documents.length === 0) {
      throw new Error('User not found');
    }

    const userDocument = user.documents[0];

    // Calculate new balance
    const newBalance = (userDocument.balance || 0) - amount;

    // Update the user's balance in the document
    const updatedUser = await database.updateDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      userDocument.$id,
      { balance: newBalance }
    );

    return parseStringify(updatedUser);
  } catch (error) {
    console.error('Error updating user balance', error);
  }
};
