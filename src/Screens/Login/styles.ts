import { StyleSheet } from 'react-native';
import { colors } from '../../Theme/colors';
import { scale, verticalScale, moderateScale } from '../../Utils/scaling';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  unionContainer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
  },
  unionImage: {
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: verticalScale(290),
    alignItems: 'center',
  },
  logo: {
    width: scale(75),
    height: verticalScale(40),
  },
  content: {
    backgroundColor: 'transparent',
  },
  greetings: {
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(16),
  },
  welcomeText: {
    color: colors.textLight,
    marginBottom: verticalScale(4),
  },
  nameText: {
    color: colors.textLight,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(24),
  },
  sheetTitle: {
    marginBottom: verticalScale(24),
    color: colors.inputText,
  },
  inputGroup: {
    marginBottom: verticalScale(16),
  },
  inputLabel: {
    fontSize: moderateScale(12),
    color: colors.placeholder,
    marginBottom: verticalScale(4),
    marginLeft: scale(4),
  },
  inputContainer: {
    height: verticalScale(56),
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: moderateScale(12),
    backgroundColor: colors.inputBackground,
    paddingHorizontal: scale(16),
    justifyContent: 'center',
  },
  input: {
    fontSize: moderateScale(16),
    color: colors.inputText,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyeIcon: {
    width: scale(24),
    height: scale(24),
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: moderateScale(4),
    marginRight: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
  },
  rememberText: {
    color: colors.inputText,
  },
  loginButton: {
    height: verticalScale(48),
    borderRadius: moderateScale(24),
  },
  forgotPasswordButton: {
    marginTop: verticalScale(16),
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: colors.primary,
  },
});
