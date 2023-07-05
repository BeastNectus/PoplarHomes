import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  TextInput,
  FlatList,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Divider, Searchbar } from "react-native-paper";
import {
  useQuery,
  useMutation,
  gql,
} from "@apollo/client";
import HomeScreenStyles from "./HomeScreenStyles";

// GraphQL query to fetch data
const GET_BUILDINGS = gql`
  query GetBuildings {
    buildings {
      buildingId
      address
      baths
      beds
      rent
      imageUrl
    }
  }
`;

// GraphQL mutation to add a building
const ADD_BUILDING = gql`
  mutation AddBuilding(
    $address: String!
    $baths: Int!
    $beds: Int!
    $rent: Float!
  ) {
    addBuilding(address: $address, baths: $baths, beds: $beds, rent: $rent) {
      buildingId
      address
      baths
      beds
      rent
      imageUrl
    }
  }
`;

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [baths, setBaths] = React.useState("");
  const [beds, setBeds] = React.useState("");
  const [rent, setRent] = React.useState("");

  const { loading, error, data } = useQuery(GET_BUILDINGS);
  const [addBuilding] = useMutation(ADD_BUILDING);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddProperty = () => {
    if (address && baths && beds && rent) {
      addBuilding({
        variables: {
          address,
          baths: parseInt(baths),
          beds: parseInt(beds),
          rent: parseFloat(rent),
        },
        refetchQueries: [{ query: GET_BUILDINGS }],
      })
        .then(() => {
          setAddress("");
          setBaths("");
          setBeds("");
          setRent("");
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error adding property:", error);
        });
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const buildings = data.buildings || [];

  return (
    <View style={HomeScreenStyles.container}>
      <View style={HomeScreenStyles.header}>
        <Image
          source={require("../../../../assets/poplar-logo.png")}
          style={HomeScreenStyles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={HomeScreenStyles.burgerIcon}>
          <Icon name="bars" size={24} color="#FF7400" />
        </TouchableOpacity>
      </View>

      <Divider style={HomeScreenStyles.fullWidthDivider} />

      <Searchbar
        placeholder="Where are we moving?"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={HomeScreenStyles.searchBar}
      />

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={HomeScreenStyles.modalContainer}>
          <View style={HomeScreenStyles.modalContent}>
            <TextInput
              style={HomeScreenStyles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Address"
              testID="app-input-address"
            />
            <TextInput
              style={HomeScreenStyles.input}
              value={baths}
              onChangeText={setBaths}
              placeholder="Baths"
              testID="app-input-baths"
              keyboardType="numeric"
            />
            <TextInput
              style={HomeScreenStyles.input}
              value={beds}
              onChangeText={setBeds}
              placeholder="Beds"
              testID="app-input-beds"
              keyboardType="numeric"
            />
            <TextInput
              style={HomeScreenStyles.input}
              value={rent}
              onChangeText={setRent}
              placeholder="Rent"
              testID="app-input-rent"
              keyboardType="numeric"
            />
            <View style={HomeScreenStyles.buttonContainer}>
              <Button
                title="Submit"
                onPress={handleAddProperty}
                testID="submit-button"
                color="#FF7400"
              />
            </View>
            <View style={HomeScreenStyles.buttonContainer}>
              <Button
                title="Close"
                onPress={() => setShowModal(false)}
                testID="close-button"
                color="#888888"
              />
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={buildings}
        keyExtractor={(item, index) => `${item.buildingId}_${index}`}
        renderItem={({ item, index }) => (
          <View
            key={`${item.buildingId}_${index}`}
            style={HomeScreenStyles.itemContainer}
          >
            <Image source={{ uri: item.imageUrl }} style={HomeScreenStyles.image} />
            <Text>{item.beds} - bedroom</Text>
            <Text>{item.baths} - bath</Text>
            <Text style={HomeScreenStyles.rentText}>${item.rent}</Text>
            <Text testID={`list-item${index}-address`}>
              <Icon name="map-marker" size={15} color="#5C6471" />
              {item.address}
            </Text>
          </View>
        )}
        testID="customer-list"
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={HomeScreenStyles.addButton}
        onPress={() => setShowModal(true)}
        testID="addbutton"
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen