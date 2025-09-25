import { electronicsLevelThree } from "./level three/electronicsLevelThree";
import { furnitureLevelThree } from "./level three/furnitureLevelThree";
import { menLevelThree } from "./level three/menLevelThree";
import { womenLevelThree } from "./level three/womenLevelThree";
import { electronicsLevelTwo } from "./level two/electronicsLevelTwo";
import { furnitureLevelTwo } from "./level two/furnitureLevelTwo";
import { menLevelTwo } from "./level two/menLevelTwo";
import { womenLevelTwo } from "./level two/womenLevelTwo";



export const mainCategory = [
  {
    name: "Men",
    categoryId: "men",
    level: 1,
    levelTwoCategory: menLevelTwo.map(cat => ({
      ...cat,
      levelThreeCategory: menLevelThree.filter(
        sub => sub.parentCategoryId === cat.categoryId
      ),
    })),
  },
  {
    name: "Women",
    categoryId: "women",
    level: 1,
    levelTwoCategory: womenLevelTwo.map(cat => ({
      ...cat,
      levelThreeCategory: womenLevelThree.filter(
        sub => sub.parentCategoryId === cat.categoryId
      ),
    })),
  },
  {
    name: "Electronics",
    categoryId: "electronics",
    level: 1,
    levelTwoCategory: electronicsLevelTwo.map(cat => ({
      ...cat,
      levelThreeCategory: electronicsLevelThree.filter(
        sub => sub.parentCategoryId === cat.categoryId
      ),
    })),
  },
  {
    name: "Furniture",
    categoryId: "home_furniture",
    level: 1,
    levelTwoCategory: furnitureLevelTwo.map(cat => ({
      ...cat,
      levelThreeCategory: furnitureLevelThree.filter(
        sub => sub.parentCategoryId === cat.categoryId
      ),
    })),
  },
];
