<script setup lang="ts">
import { useReceiptStore } from "@/stores/receipt";
import { useSellStore } from "@/stores/sell";
import { onMounted } from "vue";

onMounted(async () => {
  await receiptStore.getOneReceiptsByUUid(sellStore.getReceiptUuid());
});

const receiptStore = useReceiptStore();
const sellStore = useSellStore();

const checkReceiptDetail = () => {
  if (receiptStore.receiptsAt?.receiptDetail! != undefined) {
    if (receiptStore.receiptsAt?.receiptDetail?.length! > 0) {
      return true;
    }
  }
  return false;
};
</script>

<template>
  <v-dialog v-model="sellStore.billDialog" persistent max-width="600px">
    <v-container>
      <v-row>
        <v-col sm="12">
          <v-card
            max-width="600px"
            height="90vh"
            variant="outlined"
            class="overflow-y-auto bg-white"
          >
            <v-row>
              <v-col align="center" justify="center">
                <v-card
                  class="mx-2 ma-2 justify-center"
                  variant="outlined"
                  max-width="400"
                >
                  <v-card-item>
                    <div class="text-h5">
                      Table No. {{ receiptStore.receiptsAt?.table?.id! }}
                    </div>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mx-2 ma-2">
              <v-col>
                <div class="position-absolute" style="left: 10%">
                  DATE: {{ receiptStore.date.getDate() }}/{{
                    receiptStore.date.getMonth() + 1
                  }}/{{ receiptStore.date.getFullYear() }}
                </div>
              </v-col>
              <v-col>
                <div class="position-absolute" style="right: 10%">
                  TIME :
                  {{ receiptStore.date.toLocaleTimeString() }}
                </div>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="10">
                <v-table fixed-header fixed-footer height="50vh">
                  <thead>
                    <tr>
                      <th style="border-bottom: none">No.</th>
                      <th style="border-bottom: none">Menu Name</th>
                      <th style="border-bottom: none">Quantity</th>
                      <th style="border-bottom: none">Price</th>
                      <th style="border-bottom: none">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="checkReceiptDetail()">
                      <tr
                        v-for="(item, index) in receiptStore.receiptsAt
                          ?.receiptDetail"
                        :key="index"
                      >
                        <td style="border-bottom: none">{{ index + 1 }}</td>
                        <td style="border-bottom: none">{{ item.name }}</td>
                        <td style="border-bottom: none">{{ item.quantity }}</td>
                        <td style="border-bottom: none">{{ item.price }}</td>
                        <td style="border-bottom: none">{{ item.total }}</td>
                      </tr>
                    </template>
                    <template v-else>
                      <td style="border: none; text-align: center" colspan="4">
                        ยังไม่มีรายการอาหาร
                      </td>
                    </template>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        style="border-bottom: 1px solid #dddddd; height: 0px"
                        colspan="5"
                      ></td>
                    </tr>
                  </tfoot>
                </v-table>
              </v-col>
            </v-row>

            <v-row class="ma-auto">
              <v-col>
                <div class="position-absolute" style="left: 11%">SUBTOTAL</div>
              </v-col>
              <v-col>
                <div class="position-absolute" style="right: 20%">
                  {{ receiptStore.receiptsAt?.subtotal }}
                </div>
              </v-col>
            </v-row>

            <v-row class="ma-2">
              <v-col>
                <div class="position-absolute" style="left: 11%">DISCOUNT</div>
              </v-col>
              <v-col>
                <div class="position-absolute" style="right: 20%">
                  {{ receiptStore.receiptsAt?.discount }}
                </div>
              </v-col>
            </v-row>

            <v-row class="ma-4">
              <v-col>
                <div
                  class="position-absolute font-weight-bold"
                  style="left: 11%"
                >
                  TOTAL
                </div>
              </v-col>
              <v-col>
                <div
                  class="position-absolute font-weight-bold"
                  style="right: 20%"
                >
                  {{ receiptStore.receiptsAt?.total }}
                </div>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                variant="text"
                @click="sellStore.billDialog = false"
              >
                Close
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row> </v-container
  ></v-dialog>
</template>

<style scoped>
.v-text-field {
  text-align: right;
}
</style>
