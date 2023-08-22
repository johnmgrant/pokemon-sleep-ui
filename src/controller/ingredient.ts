import {Collection} from 'mongodb';

import {getDataAsMap} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {Ingredient, IngredientId, IngredientMap} from '@/types/mongo/ingredient';


const getCollection = async (): Promise<Collection<Ingredient>> => {
  const client = await mongoPromise;

  return client
    .db('food')
    .collection<Ingredient>('ingredient');
};

export const getIngredientData = async (id: IngredientId): Promise<Ingredient | null> => {
  return (await getCollection()).findOne({id}, {projection: {_id: false}});
};

export const getAllIngredients = async (): Promise<IngredientMap> => {
  return getDataAsMap(getCollection(), ({id}) => id);
};

const addIngredientDataIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({id: 1}, {unique: true}),
  ]);
};

addIngredientDataIndex()
  .catch((e) => console.error('MongoDB failed to add ingredient index', e));
