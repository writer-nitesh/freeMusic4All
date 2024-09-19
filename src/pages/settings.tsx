import { Title } from "../components";
import Select from "../components/ui/select";
import { useData } from "../data/store";

export function Settings() {

    const { quality, setQuality } = useData((state) => state)

    function handleQualityChange(name: string, value: string) {
        setQuality({
            ...quality,
            [name]: value
        })
    }

    return (
        <div className="w-full flex flex-col h-full">
            <Title title="Settings" />

            <div className="flex flex-col gap-4 w-full items-center justify-center">
                <div className="flex gap-4 w-full items-center justify-between">
                    <span>Stream Quality</span>
                    <Select
                        label="select stream quality"
                        options={["12kbps", "40kbps", "96kbps", "160kbps", "320kbs"]}
                        defaultOption={quality.stream}
                        name="stream"
                        onSelect={handleQualityChange}
                    />
                </div>
                <div className="flex gap-4 w-full items-center justify-between">
                    <span>Download Quality</span>
                    <Select
                        label="select stream quality"
                        options={["12kbps", "40kbps", "96kbps", "160kbps", "320kbs"]}
                        defaultOption={quality.download}
                        name="download"
                        onSelect={handleQualityChange}
                    />
                </div>
                <div className="flex gap-4 w-full items-center justify-between">
                    <span>Image Quality</span>
                    <Select
                        label="select stream quality"
                        options={["50x50", "150x150", "500x500"]}
                        defaultOption={quality.image}
                        name="image"
                        onSelect={handleQualityChange}
                    />
                </div>


            </div>
        </div>
    )
}
