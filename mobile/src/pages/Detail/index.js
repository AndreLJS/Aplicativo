import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as mailComposer from "expo-mail-composer";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const vaga = route.params.vaga;

  const message = `Olá ${vaga.name}, estou entrando em contato pois a vaga de ${vaga.title} me interessou e tenho todos os requisitos necessários.`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    mailComposer.composeAsync({
      subject: `Vaga: ${vaga.title}`,
      recipients: [vaga.email],
      body: message,
    });
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=55${vaga.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={[vaga]}
        style={styles.vagasList}
        keyExtractor={(vaga) => String(vaga)}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        renderItem={({ item: vaga }) => (
          <View style={styles.vaga}>
            <Text style={[styles.vagaProperty, { marginTop: 0 }]}>
              EMPRESA:
            </Text>
            <Text style={styles.vagaValue}>
              {vaga.name} de {vaga.city}/{vaga.uf}
            </Text>

            <Text style={styles.vagaProperty}>VAGA:</Text>
            <Text style={styles.vagaValue}>{vaga.title}</Text>

            <Text style={styles.vagaProperty}>QUALIFICAÇAO:</Text>
            <Text style={styles.vagaValue}>{vaga.qualification}</Text>

            <Text style={styles.vagaProperty}>FORMAÇAO:</Text>
            <Text style={styles.vagaValue}>{vaga.formation}</Text>

            <Text style={styles.vagaProperty}>SALÁRIO:</Text>
            <Text style={styles.vagaValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(vaga.value)}
            </Text>

            <Text style={styles.vagaProperty}>DESCRIÇAO:</Text>
            <Text style={styles.vagaValue}>{vaga.description}</Text>

            <Text style={styles.vagaProperty}>Local de Trabalho:</Text>
            <Text style={styles.vagaValue}>{vaga.workplace}</Text>
          </View>
        )}
      />

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Envie seu currículo.</Text>

        <Text style={styles.heroDescription}>Entre em contato: </Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
