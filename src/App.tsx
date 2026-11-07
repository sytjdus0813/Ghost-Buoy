import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import DeviceFrame from './components/DeviceFrame'
import { StoreProvider } from './data/store'
import Login from './screens/Login'
import HomeMain from './screens/home/HomeMain'
import HomeSession from './screens/home/HomeSession'
import Setting from './screens/home/Setting'
import ExploreMain from './screens/explore/ExploreMain'
import ExploreMap from './screens/explore/ExploreMap'
import ExploreMission from './screens/explore/ExploreMission'
import MissionDetail from './screens/explore/MissionDetail'
import ExploreSave from './screens/explore/ExploreSave'
import CommunityPopular from './screens/explore/CommunityPopular'
import CommunityRecent from './screens/explore/CommunityRecent'
import CommunityFollowing from './screens/explore/CommunityFollowing'
import ExploreProfile from './screens/explore/ExploreProfile'
import DeviceMain from './screens/device/DeviceMain'
import DeviceSystem from './screens/device/DeviceSystem'
import DeviceAdd from './screens/device/DeviceAdd'
import LogMain from './screens/log/LogMain'
import LogCalendar from './screens/log/LogCalendar'
import LogDetail from './screens/log/LogDetail'
import MyMain from './screens/my/MyMain'

// HashRouter: 정적 호스팅/QR로 열어도 새로고침 시 404가 나지 않도록
export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <DeviceFrame>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/home" element={<HomeMain />} />
            <Route path="/home/session" element={<HomeSession />} />
            <Route path="/setting" element={<Setting />} />

            <Route path="/explore" element={<ExploreMain />} />
            <Route path="/explore/map" element={<ExploreMap />} />
            <Route path="/explore/mission" element={<ExploreMission />} />
            <Route path="/explore/mission/detail" element={<MissionDetail />} />
            <Route path="/explore/save" element={<ExploreSave />} />
            <Route path="/explore/community" element={<CommunityPopular />} />
            <Route path="/explore/community/recent" element={<CommunityRecent />} />
            <Route path="/explore/community/following" element={<CommunityFollowing />} />
            {/* ⚠️ 포인트 후기 화면은 Figma에 없음 → 최근 목록 재사용 */}
            <Route path="/explore/community/review" element={<CommunityRecent />} />
            <Route path="/explore/profile" element={<ExploreProfile />} />

            <Route path="/device" element={<DeviceMain />} />
            <Route path="/device/system" element={<DeviceSystem />} />
            <Route path="/device/add" element={<DeviceAdd />} />

            <Route path="/log" element={<LogMain />} />
            <Route path="/log/calendar" element={<LogCalendar />} />
            <Route path="/log/:id" element={<LogDetail />} />

            <Route path="/my" element={<MyMain />} />

            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </DeviceFrame>
      </HashRouter>
    </StoreProvider>
  )
}
