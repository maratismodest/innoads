import { useEffect, useState } from 'react';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setDeviceType('desktop');
      } else if (width >= 768) {
        setDeviceType('tablet');
      } else {
        setDeviceType('mobile');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceType;
}

export default useDeviceType;
