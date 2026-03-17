import Dialog from "@/components/dialog";
import { SelectVehicle } from "@/components/select-vehicles";
import React, { useState } from "react";
import { Text, View } from "react-native";

const StartTripForm = ({
  openStartTrip,
  onStartTripClose,
}: {
  openStartTrip: boolean;
  onStartTripClose: () => void;
}) => {
  const [vechicle, setVechicle] = useState<string | undefined>(undefined);
  return (
    <Dialog open={openStartTrip} onClose={onStartTripClose}>
      <View>
        <Text className="text-white">Start trip</Text>
      </View>
      <SelectVehicle
        value={vechicle}
        onChange={(vechicleId) => setVechicle(vechicleId)}
      />
    </Dialog>
  );
};

export default StartTripForm;
