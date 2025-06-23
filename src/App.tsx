import React from 'react';
import './App.css';
import { Divider, MantineProvider, createTheme } from '@mantine/core';
import '@mantine/dates/styles.css';

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';
import HomePage from './Pages/HomePage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import FindJobsPage from './Pages/FindJobsPage';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import FindTalentPage from './Pages/FindTalentPage';
import TalentProfilePage from './Pages/TalentProfilePage';
import PostJobPage from './Pages/PostJobPage';
import JobDescPage from './Pages/JobDescPage';
import ApplyJobPage from './Pages/ApplyJobPage';
import CompanyPage from './Pages/CompanyPage';
import PostedJobPage from './Pages/PostedJobPage';
import JobHistoryPage from './Pages/JobHistoryPage';
import SignUpPage from './Pages/SignUpPage';
import ProfilePage from './Pages/ProfilePage';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import Store from './Store';
import { getItem } from './Services/LocalStorageService';
import AppRoutes from './Pages/AppRoutes';

function App() {
  // const theme = createTheme({
  //   focusRing:"never",
  //   primaryColor:"bright-sun",
  //   primaryShade:4,
  //   colors:{
  //     'bright-sun': ['#fffbeb','#fff3c6','#ffe588','#ffd149','#ffbd20','#f99b07','#dd7302','#b75006','#943c0c','#7a330d','#461902'],
  //     'mine-shaft': ['#f6f6f6','#e7e7e7','#d1d1d1','#b0b0b0','#888888','#6d6d6d', '#5d5d5d','#4f4f4f','#454545','#3d3d3d', '#2d2d2d']
  //   },
  //   fontFamily:"poppins, sans-serif"
  // })

  const theme = createTheme({
  focusRing: "never",
  primaryColor: "bright-sun",
  primaryShade: 4,
  colors: {
    'bright-sun': [
      '#E8F4F9', // 0 - lightest
      '#D0E9F5', // 1
      '#B2DCEF', // 2
      '#84C4E8', // 3
      '#57A7D9', // 4 <- primaryShade
      '#0077B5', // 5 - LinkedIn base blue
      '#006097', // 6 - darkened
      '#005683', // 7
      '#004471', // 8
      '#00345C', // 9
      '#00243F'  // 10 - darkest
    ],
    'mine-shaft': [
      '#f6f6f6', '#e7e7e7', '#d1d1d1', '#b0b0b0', '#888888',
      '#6d6d6d', '#5d5d5d', '#4f4f4f', '#454545', '#3d3d3d', '#2d2d2d'
    ]
  },
  fontFamily: "poppins, sans-serif"
});


  return (
    <Provider store={Store}>
    <MantineProvider defaultColorScheme='dark' theme={theme}>
      <Notifications position='top-center' zIndex={1000}/>
      <AppRoutes/>
    </MantineProvider>
    </Provider>
  );
}

export default App;
