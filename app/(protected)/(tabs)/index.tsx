import { View } from 'react-native';
import CustomText from '../../../components/CustomText';

export default function Dashboard() {
  return (
    <View className="flex flex-1 items-center justify-center bg-primary">
      <CustomText className='text-3xl text-foreground'>Update Tab [Dashboard]</CustomText>
    </View>
  );
}