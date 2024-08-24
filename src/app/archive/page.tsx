import CoreLayout from "@/components/layouts/CoreLayout";
import { serviceClient } from "@/lib/api";

import { FullscreenImagesCarousel } from "@/components/sections/FullscreenImagesCarousel";
import { ArchiveMediaItem } from "@/components/sections/FullscreenImagesCarousel/ArchiveMediaItem";

export default async function Page() {
  const { archives } = await serviceClient.GetArchivesPaged({
    limit: 10,
    offset: 0,
    orderFactor: "ORDER_FACTOR_UNKNOWN",
  });

  const nonEmptyArchives = archives?.filter((v) => v.archive) || [];

  return (
    <div className="blueTheme">
      <CoreLayout>
        <div className="flex flex-col gap-14">
          {nonEmptyArchives?.map((a, i) => (
            <div key={a.archive?.id || i} className="text-textColor">
              <div className="flex gap-3 overflow-x-scroll">
                {/* todo: fix images. make sure all the images have known size + add scroll when there are more images  */}

                {a.items && (
                  <FullscreenImagesCarousel
                    mediaList={a.items.map((x) => x.archiveItem?.media!)}
                    ItemComponent={ArchiveMediaItem}
                  />
                )}
              </div>
              {/* todo: doublec check foint sizes for mobile */}
              <div className="text-md mb-4 mt-6 lg:text-xl">
                {a.archive?.archiveBody?.heading}
              </div>
              <div className="flex justify-between gap-6">
                <p>{a.archive?.archiveBody?.text}</p>
                <p>{a.archive?.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </CoreLayout>
    </div>
  );
}
