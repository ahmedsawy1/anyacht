import React, {FC} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SharedStyles} from '../../styles/sharedStyles';
import MainButton from '../../components/buttons/MainButton';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';

interface IDeleteModal {
  showProp: boolean;
  toggleModal: () => void;
  handleDelete: () => void;
}

const DeleteModal: FC<IDeleteModal> = ({
  showProp,
  toggleModal,
  handleDelete,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={showProp}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{paddingHorizontal: 15}}>
            <Text
              style={{
                fontFamily: Fonts.Medium,
                fontSize: PixelPerfect(17),
                color: '#000',
                textAlign: 'center',
                marginVertical: 5,
              }}>
              حذف الحساب
            </Text>
            <Text
              style={{
                fontFamily: Fonts.Medium,
                fontSize: PixelPerfect(15),
                color: '#828282',
                textAlign: 'center',
                marginBottom: 15,
              }}>
              هل انت متاكد انك تريد حذف حسابك؟
            </Text>

            <MainButton
              style={{marginTop: 20, backgroundColor: '#ff3636'}}
              title={'حذف الحساب'}
              onPress={() => {
                handleDelete();
              }}
            />
             <MainButton
              style={{marginTop: 5, backgroundColor: Colors.grayText}}
              title={'تراجع'}
              onPress={() => {
                toggleModal();
              }}
            />
          </View>
        </View>
       
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
    position: 'relative',
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
});

export default DeleteModal;
