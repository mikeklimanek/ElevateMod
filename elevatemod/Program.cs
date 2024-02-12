// See https://aka.ms/new-console-template for more information
using System;
using System.Threading;
using System.Threading.Tasks;

namespace elevatemod 
{
    class Program 
    {
        static async Task Main(string[] args) 
        {
            Console.WriteLine("Daily task started");
            var targetTime = new TimeSpan(13, 40, 00);

            while(true)
            {
                var currentTime = DateTime.Now.TimeOfDay;
                var timeToWait = targetTime - currentTime;

                if (timeToWait < TimeSpan.Zero)
                {
                    timeToWait += TimeSpan.FromDays(1);
                }

                Console.WriteLine($"Waiting for {timeToWait} to perform daily task.");

                await Task.Delay(timeToWait);

                PerformDailyTask();
            }

        }

        static void PerformDailyTask()
        {
            Console.WriteLine($"Daily task performed at {DateTime.Now}");
        }
    }
}

