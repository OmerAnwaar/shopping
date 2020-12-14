import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import {
  createAppContainer,
  createSwitchNavigator,
  withOrientation,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import {
  Platform,
  SafeAreaView,
  Button,
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import ignoreWarnings from "react-native-ignore-warnings";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import SplashScreen from "../screens/SplashScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/chef/EditProductScreen";
import ChefProfileScreen from "../screens/chef/ChefProfileScreen";
import ReceivedOrdersScreen from "../screens/chef/ReceivedOrdersScreen";
import UserProfileScreen from "../screens/user/UserProfileScreen";
import SentOrdersScreen from "../screens/shop/SentOrdersScreen";
import ChefLocationScreen from "../screens/chef/ChefLocationScreen";
import LocationScreen from "../screens/user/LocationScreen";
import ChefProductOverViewScreen from "../screens/chef/ChefProductOverViewScreen";
import Colors from "../constants/Colors";
import AuthScreen from "../screens/user/AuthScreen";
import ChefAuthScreen from "../screens/chef/ChefAuthScreen";
import StartupScreen from "../screens/StartupScreen";

import * as authActions from "../store/actions/auth";
import * as chefauth from "../store/actions/authChef";
import { db } from "../firebase/Firebase";
import UserName from "../screens/user/UserName";
import AllProductsScreen from "../screens/shop/AllProductsScreen";
import CategoriesScreen from "../screens/shop/CategoriesScreen";
import CategorizedProductsScreen from "../screens/shop/CategorizedProductsScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    AllProd: AllProductsScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const ChefProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ChefProductOverViewScreen,
    ProductDetail: ProductDetailScreen,
    AllProd: AllProductsScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const SentOrdersNavigator = createStackNavigator(
  {
    SentOrders: SentOrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-clock" : "ios-clock"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ReceivedOrdersNavigator = createStackNavigator(
  {
    ReceivedOrders: ReceivedOrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const UserProfileNavigator = createStackNavigator(
  {
    Profile: UserProfileScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-person" : "ios-person"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ChefProfileNavigator = createStackNavigator(
  {
    Profile: ChefProfileScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-person" : "ios-person"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const CategoriesNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategorizedProducts: CategorizedProductsScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-browsers" : "ios-browsers"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const LocationNavigator = createStackNavigator(
  {
    Address: LocationScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Entypo name={"address"} size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ChefLocationNavigator = createStackNavigator(
  {
    Address: ChefLocationScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Entypo name={"address"} size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Profile: UserProfileNavigator,
    Orders: OrdersNavigator,
    Address: LocationNavigator,
    Categories: CategoriesNavigator,
    InProgress: SentOrdersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const [userName, setuserName] = useState("");
      const db = firebase.firestore();
      const dispatch = useDispatch();
      ignoreWarnings("Possible Unhandled Promise");
      const ReduxCurrentUser = useSelector((state) => state.auth.userId);

      const getUserName = async () => {
        let userNameRef = db.collection("app-users").doc(ReduxCurrentUser);
        let userNameGetter = await userNameRef.get();
        setuserName(userNameGetter.data().UserName);
        {
          console.log("i am running========>", userNameGetter.data());
        }
      };
      getUserName();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <View style={styles.UserNameHolder}>
              <Ionicons
                name={Platform.OS == "android" ? "md-person" : "ios-person"}
                size={25}
                color={Colors.primary}
              />
              <Text style={styles.usertxt}>Welcome {userName}</Text>
              <UserName />
            </View>
            <DrawerNavigatorItems {...props} />

            <View style={styles.button}>
              <View style={styles.logout}>
                <Button
                  title="Logout"
                  color={Platform.OS === "android" ? Colors.primary : "white"}
                  onPress={() => {
                    dispatch(authActions.logout());
                    // props.navigation.navigate("Auth");
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
        </View>
      );
    },
  }
);

const ChefShopNavigator = createDrawerNavigator(
  {
    Products: ChefProductsNavigator,
    AddProducts: AdminNavigator,
    Profile: ChefProfileNavigator,
    Address: ChefLocationNavigator,
    ReceivedOrders: ReceivedOrdersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const [userName, setuserName] = useState("");
      const [ChefStatus, setChefStatus] = useState(false);
      const dispatch = useDispatch();
      const db = firebase.firestore();
      const ReduxCurrentUser = useSelector((state) => state.authChef.userId);
      ignoreWarnings("Possible Unhandled Promise");
      const CheckChef = async () => {
        let checkChefRef = db.collection("app-users").doc(ReduxCurrentUser);
        let statusGetter = await checkChefRef.get();
        setChefStatus(statusGetter.data().chefStatus);
        console.log("Ye status mila hai", ChefStatus);
        if (ChefStatus === false) {
          Alert.alert("Sign Up as a Chef!");
          dispatch(chefauth.logout());
          props.navigation.navigate("Auth");
        }
      };
      CheckChef();
      const getUserName = async () => {
        let userNameRef = db.collection("chefs").doc(ReduxCurrentUser);
        let userNameGetter = await userNameRef.get();
        setuserName(userNameGetter.data().ChefName);
      };
      getUserName();

      ignoreWarnings("Possible Unhandled Promise");
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <View style={styles.UserNameHolder}>
              <Ionicons
                name={Platform.OS == "android" ? "md-person" : "ios-person"}
                size={25}
                color={Colors.primary}
              />
              <Text style={styles.usertxt}>Welcome {userName}</Text>
              <UserName />
            </View>
            <DrawerNavigatorItems {...props} />

            <View style={styles.button}>
              <View style={styles.logout}>
                <Button
                  title="Logout"
                  color={Platform.OS === "android" ? "white" : "white"}
                  onPress={() => {
                    console.log("i amhere");
                    dispatch(authActions.logout());
                    props.navigation.navigate("Auth");
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Splash: SplashScreen,
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ChefAuthNavigator = createStackNavigator(
  {
    // Splash: SplashScreen,
    ChefAuth: ChefAuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  StartUp: StartupScreen,
  Splash: SplashScreen,
  Auth: AuthNavigator,
  ChefAuth: ChefAuthNavigator,
  Shop: ShopNavigator,
  Chef: ChefShopNavigator,
  SentOrders: SentOrdersNavigator,
});

const styles = StyleSheet.create({
  button: {
    paddingTop: 250,
  },
  chef: {
    borderColor: Colors.primary,
    borderWidth: 1,
    margin: 10,
  },
  logout: {
    backgroundColor: Colors.primary,
    margin: 10,
  },
  UserNameHolder: {
    paddingTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  usertxt: {
    color: Colors.primary,
    marginLeft: 10,
    fontSize: 20,
  },
});

export default createAppContainer(MainNavigator);
// export default createAppContainer(AdminNavigator);
