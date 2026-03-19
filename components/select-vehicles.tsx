import { AppIcon } from "@/components/icon";
import { APP_COLORS } from "@/lib/consts";
import { useAvailableVehicles } from "@/module/vehicle/hooks";
import type { Vehicle } from "@/module/vehicle/schemas/vehicle.schema";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SelectVehicleProps = {
  value?: string;
  onChange?: (vehicleId: string, vehicle?: Vehicle) => void;
  label?: string;
  disabled?: boolean;
};

export function SelectVehicle({
  value,
  onChange,
  label = "Select Vehicle",
  disabled = false,
}: SelectVehicleProps) {
  const [visible, setVisible] = useState(false);

  const { data: vechicles, isLoading } = useAvailableVehicles();

  const selectedVehicle = vechicles?.find((v) => v.id === value);

  return (
    <View className="gap-2">
      <Text className="text-sm text-textSecondary">{label}</Text>

      {/* Trigger */}
      <TouchableOpacity
        disabled={disabled || isLoading}
        onPress={() => setVisible(true)}
        className="bg-card border border-borderSubtle rounded-xl px-4 py-3"
      >
        <Text className="text-textPrimary">
          {isLoading
            ? "Loading vehicles..."
            : selectedVehicle
              ? `${selectedVehicle.vehicle_number} • ${selectedVehicle.vehicle_type}`
              : "Choose a vehicle"}
        </Text>
      </TouchableOpacity>

      {/* Modal Dropdown */}
      <Modal visible={visible} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/50 justify-center px-6"
          onPress={() => setVisible(false)}
        >
          <View className="bg-cardElevated rounded-2xl max-h-[70%] p-4">
            <Text className="text-lg text-textPrimary mb-4">
              Select Vehicle
            </Text>

            <FlatList
              data={vechicles ?? []}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onChange && onChange(item.id, item);
                    setVisible(false);
                  }}
                  className="py-3 border-b border-borderSubtle"
                >
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-textPrimary">
                        {item.vehicle_number}
                      </Text>
                      <Text className="text-textSecondary text-sm">
                        {item.vehicle_type}
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-3">
                      <Image
                        source={
                          item.image_url
                            ? { uri: item.image_url }
                            : require("@/assets/default-avatar.png")
                        }
                        alt="Avatar"
                        style={{ width: 50, height: 50, borderRadius: 75 }}
                      />
                      <View className="w-[30px] h-[30px]">
                        {item.id === selectedVehicle?.id && (
                          <AppIcon
                            IconComponent={MaterialIcons}
                            name="done"
                            color={APP_COLORS.success}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
