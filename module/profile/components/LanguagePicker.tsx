import { LANGUAGES } from "@/constants/languages";
import { useLanguage } from "@/hooks/useLanguage";
import React from "react";
import { FlatList } from "react-native";
import LanguageItem from "./LanguageItem";

const LanguagePicker = () => {
  const { activeLabel, changeLanguage } = useLanguage();
  return (
    <FlatList
      data={LANGUAGES}
      keyExtractor={(item) => item.code}
      renderItem={({ item }) => (
        <LanguageItem
          language={item.label}
          country={item.country}
          handleLanguage={changeLanguage}
          active={activeLabel === item.label}
        />
      )}
    />
  );
};

export default LanguagePicker;
