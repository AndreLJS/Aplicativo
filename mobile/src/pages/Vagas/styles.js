import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerText: {
    fontSize: 15,
    color: "#737380",
  },

  headerTextBold: {
    fontWeight: "bold",
  },

  title: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 30,
    color: "#13131a",
    fontWeight: "bold",
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#737380",
  },

  vagasList: {
    marginTop: 32,
  },

  vaga: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom: 16,
  },

  search: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginTop: 20,
    marginBottom: 3,
  },

  vagaProperty: {
    fontSize: 14,
    color: "#41414d",
    fontWeight: "bold",
  },

  vagaValue: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    fontWeight: "bold",
    color: "#1f1f24",
  },
  vagaName: {
    marginTop: 8,
    fontSize: 19,
    marginBottom: 24,
    fontWeight: "bold",
    color: "#263fc7",
  },

  detailsButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  detailsButtonText: {
    color: "#e02041",
    fontSize: 15,
    fontWeight: "bold",
  },

  detailsLocation: {
    marginBottom: 10,
    color: "#949494",
    fontSize: 15,
    fontWeight: "bold",
  },
});
