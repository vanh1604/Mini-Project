import { StyleSheet } from 'react-native';
import { colors } from '../../Theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.secondary,
    height: 140,
    width: '100%',
    paddingTop: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    right: 0,

    resizeMode: 'cover',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    resizeMode: 'cover',
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontFamily: 'SF Pro',
    fontWeight: '600',
    fontSize: 18,
    color: colors.black,
    letterSpacing: -0.4,
    lineHeight: 26,
    marginBottom: 4,
  },
  employeeId: {
    fontFamily: 'SF Pro',
    fontWeight: '400',
    fontSize: 12,
    color: colors.placeholder,
    letterSpacing: -0.4,
    lineHeight: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  pageTitleContainer: {
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 24,
  },
  pageTitle: {
    fontFamily: 'SF Pro',
    fontWeight: '700',
    fontSize: 28,
    color: colors.textPrimary,
    letterSpacing: -0.8,
    lineHeight: 48,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'SF Pro',
    fontWeight: '600',
    fontSize: 16,
    color: colors.black,
    letterSpacing: -0.4,
    lineHeight: 24,
    marginBottom: 8,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.borderLighter,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontFamily: 'SF Pro',
    fontWeight: '600',
    fontSize: 16,
    color: colors.primary,
    letterSpacing: -0.4,
    lineHeight: 24,
  },
});
