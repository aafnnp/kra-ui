import { Navigate } from 'react-router';

/**
 * /guide 重定向到快速开始
 */
export default function GuideIndexRedirect() {
  return <Navigate to="/guide/getting-started" replace />;
}
