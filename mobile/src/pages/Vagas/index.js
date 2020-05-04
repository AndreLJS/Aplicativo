import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export default function Vagas() {
  const [vagas, setVagas] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);

  const navigation = useNavigation();

  function navigateToDetail(vaga) {
    navigation.navigate("Detail", { vaga });
  }
  async function loadVagas() {
    if (loading) {
      return;
    }
    if (total > 0 && vagas.length === total) {
      return;
    }
    setLoading(true);

    const response = await api.get("vagas", {
      params: { page },
    });

    setVagas([...vagas, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadVagas();
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(500).then(() => setRefreshing(false));

    loadVagas();
  }, [refreshing]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} vagas</Text>.
        </Text>
      </View>

      <View style={styles.search}></View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={vagas}
        style={styles.vagasList}
        keyExtractor={(vaga) => String(vaga.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadVagas}
        onEndReachedThreshold={0.2}
        renderItem={({ item: vaga }) => (
          <View style={styles.vaga}>
            <Image source={logoImg} />

            <Text style={styles.vagaName}>{vaga.name}</Text>

            <Text style={styles.detailsLocation}>
              <Feather name="map-pin" size={16} color="#949494" />
              {vaga.city}/{vaga.uf}
            </Text>

            <Text style={styles.vagaValue}>{vaga.title}</Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(vaga)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
