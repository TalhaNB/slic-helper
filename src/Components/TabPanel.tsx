interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ height: "75lvh", maxHeight: "75lvh", overflowY: "scroll", marginBottom: 10 }}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
